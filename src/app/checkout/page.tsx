"use client";
import CartItem from "@/components/Cart/CartItem";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import { Image, Input, Radio, RadioGroup, cn, Autocomplete, AutocompleteItem, Button, Avatar } from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import moneyIcon from "@/assets/images/money-icon.png";
import momoIcon from "@/assets/images/momo-icon.png";
import vnpayIcon from "@/assets/images/vnpay-icon.png";

import { ICart } from "@/types/cart";
import { useRouter } from "next/navigation";
import ShowVoucherButton from "@/components/Voucher/ShowVoucherButton";
import useSWR from "swr";
import { IStore } from "@/types/store";
import useSearchDebounce from "@/hooks/useSearchDebounce";
import useLoading from "@/hooks/useLoading";
import { PaymentMethodType } from "@/types";
import { formatVNCurrency, generateOrderId, getCurrentDateTimeString } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { IOrder } from "@/types/order";
import useCurrentUser from "@/hooks/useCurrentUser";
import { SHIPPING_COST } from "@/lib/constants";
import useCheckoutStore from "@/hooks/useCheckoutStore";
import AppliedVoucher from "@/components/Voucher/AppliedVoucher";
import useCurrentOrderStore from "@/hooks/useCurrentOrderStore";
import { toast } from "sonner";

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/",
    },
    {
        content: "Giỏ hàng",
        href: "/cart",
    },
    {
        content: "Thanh toán",
        href: "/checkout",
    },
];

const PaymentMethodRadio = (props: any): React.ReactNode => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-default"
                ),
            }}
        >
            {children}
        </Radio>
    );
};

type CheckoutFormData = Pick<
    IOrder,
    "store_id" | "address" | "receiver_name" | "phone_number" | "order_note" | "payment_method"
>;
type NewOrder = Omit<IOrder, "order_date" | "id" | "address" | "user_id" | "order_items">;

export default function CheckoutPage(): React.ReactNode {
    const { startLoading, stopLoading, loading } = useLoading();
    const { startLoading: startSubmitLoading, stopLoading: stopSubmitLoading, loading: submitLoading } = useLoading();
    const { currentUser } = useCurrentUser();
    const { voucher: appliedVoucher, selectStoreId, clearVoucher, clearStoreId } = useCheckoutStore();
    const { insertOrderToFirebase } = useCurrentOrderStore();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CheckoutFormData>();

    const [selectedCartItems, setSelectedCartItems] = useState<ICart[]>([]);
    const totalItemPrice = useMemo(() => {
        return selectedCartItems.reduce((acc, curr) => acc + Number(curr.order_item_price), 0);
    }, [selectedCartItems]);

    const [newOrder, setNewOrder] = useState<NewOrder>({
        total_payment: totalItemPrice + SHIPPING_COST,
        payment_method: "cash",
        order_type: "online",
        order_note: "",
        shipping_cost: SHIPPING_COST,
        receiver_name: "",
        phone_number: "",
        store_id: 0,
        voucher_id: 0,
        order_status: "Đang chờ",
    });

    const {
        data: storeData,
        isLoading: storeLoading,
        error,
    } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/store`, { revalidateOnMount: true });
    const stores: IStore[] = storeData?.data || [];

    const [addressList, setAdressList] = useState<any[]>([]);
    const [addressSearch, setAddressSearch] = useState<string>("");
    const addressValue = useSearchDebounce(addressSearch, 500);

    // Get selected cart items
    useEffect(() => {
        const cartItemStorage: string | null = localStorage.getItem("cart");

        if (!cartItemStorage) {
            router.replace("/cart");
            return;
        }
        setSelectedCartItems(JSON.parse(cartItemStorage));
    }, []);

    // update total payment
    useEffect(() => {
        setNewOrder((prev) => ({
            ...prev,
            total_payment: totalItemPrice + SHIPPING_COST - (Number(appliedVoucher?.discount_price) || 0),
        }));

        setNewOrder((prev) => ({
            ...prev,
            voucher_id: appliedVoucher?.id || 0,
        }));
    }, [totalItemPrice, appliedVoucher]);

    useEffect(() => {
        if (addressValue.length > 0) {
            handleSearchAddress();
        } else {
            setAdressList([]);
        }
    }, [addressValue]);

    const handleSearchAddress = async (): Promise<void> => {
        const params: any = {
            q: addressValue,
            format: "json",
            addressdetails: 1,
            polygon_geojson: 0,
        };
        const queryString = new URLSearchParams(params).toString();

        startLoading();
        try {
            const url = `${process.env.NEXT_PUBLIC_API_NOMINATIM_BASE_URL}/search?${encodeURIComponent(queryString)}`;
            const response = await fetch(url, { method: "GET", redirect: "follow" });
            const result = await response.json();
            setAdressList(result);
        } catch (error) {
        } finally {
            stopLoading();
        }
    };

    const handleSelectPaymentMethod = (value: string): void => {
        setNewOrder((prev) => ({
            ...prev,
            payment_method: value as PaymentMethodType,
        }));
    };

    const createOrderWithCash = async (order: any): Promise<void> => {
        console.log("order: ", order);
        if (!currentUser) return;
        try {
            startSubmitLoading();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order`, {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resData = await response.json();

            if (response.status === 200) {
                const resOrder: IOrder = resData.data;
                const orderDate = resOrder.order_date;
                clearVoucher();
                clearStoreId();
                await insertOrderToFirebase({
                    userId: currentUser?.id,
                    statuses: {
                        "Đang chờ": {
                            status: "Đang chờ",
                            time: getCurrentDateTimeString(),
                        },
                    },
                    isCompleted: false,
                    orderId: resOrder.id,
                });
                router.push(`/checkout/result?orderId=${resOrder.id}&orderDate=${orderDate}`);
            } else {
                throw new Error(resData.message);
            }
        } catch (error: any) {
            console.log("error: ", error.message);
            toast.error(error.message);
        } finally {
            stopSubmitLoading();
        }
    };

    const createOrderWithOnlinePayment = (order: any) => {
        // 💳 Navigate to /checkout/online route
        const { order_items: orderItems, ...orderInfo } = order;

        const encodedOrderInfo = encodeURIComponent(JSON.stringify(orderInfo));
        const encodedOrderItems = encodeURIComponent(JSON.stringify(orderItems));

        localStorage.removeItem("order");
        router.push(`/checkout/online?encodedOrderItems=${encodedOrderItems}&encodedOrderInfo=${encodedOrderInfo}`);
    };

    const createNewOrder = (formData: CheckoutFormData, e?: React.BaseSyntheticEvent) => {
        e?.preventDefault();

        const { voucher_id, ...restOrder } = newOrder;
        let order;

        if (voucher_id) {
            order = {
                ...newOrder,
                id: generateOrderId(),
                user_id: currentUser?.id,
                address: addressValue,
                order_items: selectedCartItems,
            };
        } else {
            order = {
                ...restOrder,
                id: generateOrderId(),
                user_id: currentUser?.id,
                address: addressValue,
                order_items: selectedCartItems,
            };
        }

        if (newOrder.payment_method === "cash") {
            createOrderWithCash(order);
        } else {
            createOrderWithOnlinePayment(order);
        }
    };

    return (
        <div className="container pb-10 min-h-[400px]">
            <div className="px-6 h-full">
                <div className="mb-10">
                    <Breadcrumbs breadcumbItems={breadcumbItems} />
                </div>

                <form onSubmit={handleSubmit(createNewOrder)}>
                    <div className="grid grid-cols-12 h-full gap-0">
                        {/* Shipping - Payment method */}
                        <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                            <div className="">
                                <section className="">
                                    <h2 className="font-medium text-lg">Thông tin giao hàng</h2>

                                    <div className="mt-4 grid grid-cols-12 gap-5">
                                        <Autocomplete
                                            isLoading={storeLoading}
                                            isRequired
                                            defaultItems={stores}
                                            labelPlacement="inside"
                                            label="Chọn cửa hàng"
                                            className="col-span-12"
                                            {...register("store_id", {
                                                required: true,
                                            })}
                                            isInvalid={errors?.store_id?.type === "required"}
                                            errorMessage={
                                                errors?.store_id?.type === "required"
                                                    ? "Hãy chọn cửa hàng cần mua"
                                                    : null
                                            }
                                            onSelectionChange={(key: React.Key) => {
                                                selectStoreId(Number(key));
                                                setNewOrder((prev) => ({ ...prev, store_id: Number(key) }));
                                            }}
                                        >
                                            {(item: any) => (
                                                <AutocompleteItem key={item.id} textValue={item.store_name}>
                                                    <div className="flex items-center">
                                                        <Avatar
                                                            alt={item.store_name}
                                                            className="flex-shrink-0"
                                                            radius="sm"
                                                            size="sm"
                                                            src={item.image}
                                                        />
                                                        <div className="ms-2">
                                                            <p className="font-medium">{item.store_name}</p>
                                                            <p className="text-sm text-default-400">{item.address}</p>
                                                        </div>
                                                    </div>
                                                </AutocompleteItem>
                                            )}
                                        </Autocomplete>
                                        <Autocomplete
                                            allowsEmptyCollection={false}
                                            allowsCustomValue
                                            isLoading={loading}
                                            onInputChange={(value) => {
                                                setAddressSearch(value);
                                            }}
                                            onClear={() => {
                                                setAddressSearch("");
                                                setAdressList([]);
                                            }}
                                            inputValue={addressSearch}
                                            isRequired
                                            defaultItems={addressList}
                                            labelPlacement="inside"
                                            label="Địa chỉ giao hàng"
                                            className="col-span-12"
                                            {...register("address", {
                                                required: true,
                                            })}
                                            isInvalid={errors?.address?.type === "required"}
                                            errorMessage={
                                                errors?.address?.type === "required"
                                                    ? "Hãy nhập địa chỉ giao hàng"
                                                    : null
                                            }
                                            onSelectionChange={(key: React.Key) => setAddressSearch(key.toString())}
                                        >
                                            {(item: any) => (
                                                <AutocompleteItem
                                                    textValue={item?.display_name}
                                                    key={item?.display_name}
                                                >
                                                    {item?.display_name}
                                                </AutocompleteItem>
                                            )}
                                        </Autocomplete>

                                        <Input
                                            isRequired
                                            className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6"
                                            type="text"
                                            label="Tên người nhận"
                                            {...register("receiver_name", {
                                                required: true,
                                            })}
                                            isInvalid={errors?.receiver_name?.type === "required"}
                                            errorMessage={
                                                errors?.receiver_name?.type === "required"
                                                    ? "Hãy nhập tên người nhận"
                                                    : null
                                            }
                                            onValueChange={(value) =>
                                                setNewOrder((prev) => ({
                                                    ...prev,
                                                    receiver_name: value,
                                                }))
                                            }
                                        />
                                        <Input
                                            isRequired
                                            className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6"
                                            type="text"
                                            label="Số điện thoại"
                                            {...register("phone_number", {
                                                required: true,
                                                pattern: {
                                                    value: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
                                                    message: "Hãy nhập đúng định dạng số điện thoại",
                                                },
                                            })}
                                            isInvalid={
                                                errors?.phone_number?.type === "required" ||
                                                errors?.phone_number?.type === "pattern"
                                            }
                                            errorMessage={
                                                (errors?.phone_number?.type === "required" &&
                                                    "Hãy nhập số điện thoại người nhận") ||
                                                (errors?.phone_number?.type === "pattern" &&
                                                    "Số điện thoại không hợp lệ")
                                            }
                                            onValueChange={(value) =>
                                                setNewOrder((prev) => ({
                                                    ...prev,
                                                    phone_number: value,
                                                }))
                                            }
                                        />
                                        <Input
                                            className="col-span-12"
                                            type="text"
                                            label="Ghi chú cho đơn hàng"
                                            {...register("order_note", {
                                                required: false,
                                                maxLength: 30,
                                            })}
                                            isInvalid={errors?.order_note?.type === "maxLength"}
                                            errorMessage={
                                                errors?.order_note?.type === "maxLength"
                                                    ? "Hãy nhập ghi chú tối đa 30 ký tự"
                                                    : null
                                            }
                                            onValueChange={(value) =>
                                                setNewOrder((prev) => ({
                                                    ...prev,
                                                    order_note: value,
                                                }))
                                            }
                                        />
                                    </div>
                                </section>

                                <section className="mt-10">
                                    <h2 className="font-medium text-lg">Phương thức thanh toán</h2>

                                    <div className="mt-4">
                                        <RadioGroup
                                            onValueChange={handleSelectPaymentMethod}
                                            color="default"
                                            defaultValue={newOrder.payment_method}
                                        >
                                            <PaymentMethodRadio value="cash">
                                                <div className="flex items-center">
                                                    <Image width={24} src={moneyIcon.src} alt="money icon" />
                                                    <span className="ms-3">Tiền mặt</span>
                                                </div>
                                            </PaymentMethodRadio>
                                            <PaymentMethodRadio value="vnpay">
                                                <div className="flex items-center">
                                                    <Image
                                                        width={24}
                                                        src={vnpayIcon.src}
                                                        alt="money icon"
                                                        radius="none"
                                                    />
                                                    <span className="ms-3">VNPAY</span>
                                                </div>
                                            </PaymentMethodRadio>
                                            <PaymentMethodRadio value="momo">
                                                <div className="flex items-center">
                                                    <Image
                                                        width={24}
                                                        src={momoIcon.src}
                                                        alt="money icon"
                                                        radius="none"
                                                    />
                                                    <span className="ms-3">Momo</span>
                                                </div>
                                            </PaymentMethodRadio>
                                        </RadioGroup>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                            <div className="p-0 md:p-5">
                                <div className="shadow-lg border rounded-xl ">
                                    <div className="p-4 ">
                                        <section>
                                            <h2 className="font-medium text-lg">Các món đã chọn</h2>

                                            <ul className="mt-4">
                                                {selectedCartItems.map((cartItem) => (
                                                    <CartItem
                                                        isSelected={false}
                                                        isDeleted={false}
                                                        isEdited={false}
                                                        cartItem={cartItem}
                                                        key={cartItem.id}
                                                    />
                                                ))}
                                            </ul>
                                        </section>

                                        <section className="mt-10">
                                            <h2 className="font-medium text-lg">Tổng cộng</h2>

                                            <ul className="mt-1">
                                                <li className="flex items-center justify-between py-4 border-b">
                                                    <span className="text-sm">Thành tiền</span>
                                                    <span>{formatVNCurrency(totalItemPrice)}</span>
                                                </li>
                                                <li className="flex items-center justify-between py-4 border-b">
                                                    <span className="text-sm">Phí giao hàng</span>
                                                    <span>18.000 đ</span>
                                                </li>
                                                <li className="flex items-center justify-between py-4">
                                                    <span className="text-sm">Khuyến mãi</span>

                                                    {appliedVoucher ? (
                                                        <AppliedVoucher />
                                                    ) : (
                                                        <ShowVoucherButton
                                                            buttonProps={{
                                                                color: "primary",
                                                                variant: "flat",
                                                                radius: "full",
                                                                size: "sm",
                                                                children: "Chọn",
                                                            }}
                                                        />
                                                    )}
                                                </li>
                                            </ul>
                                        </section>
                                    </div>
                                    <div className="p-4  flex items-center justify-between bg-[#F4F4F5] ">
                                        <div>
                                            <p>Tổng thanh toán</p>
                                            <p className="text-primary mt-2 text-lg">
                                                {formatVNCurrency(newOrder.total_payment)}
                                            </p>
                                        </div>

                                        <Button
                                            isLoading={submitLoading}
                                            type="submit"
                                            radius="full"
                                            color="primary"
                                            size="lg"
                                        >
                                            Đặt hàng
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
