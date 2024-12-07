"use client";

import {
    Select,
    SelectItem,
    Skeleton,
    User,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    ModalFooter,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { IoInformationCircleSharp } from "react-icons/io5";
import { toast } from "sonner";
import { IoIosWarning } from "react-icons/io";

import CartItem from "@/components/Cart/CartItem";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import { formatDateTime, formatVNCurrency, getOrderStatusColor } from "@/lib/utils";
import { IOrderInfo } from "@/types";
import { useCurrentOrderStore, useLoading } from "@/hooks";

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/admin",
    },
    {
        content: "Đơn hàng",
        href: "/admin/order",
    },
    {
        content: "Chi tiết đơn hàng",
        href: "#",
    },
];

const STATUS_LIST: string[] = ["Đang chờ", "Đang xử lý", "Đang giao", "Hoàn thành", "Đã hủy"];

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/${params?.id}`;
    const { data: orderData, isLoading, error, mutate } = useSWR(url);

    const order: IOrderInfo = orderData?.data;
    const [currentStatus, setCurrentStatus] = useState<string>("Đang chờ");
    const [disabledStatuses, setDisabledStatuses] = useState<string[]>([]);

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { startLoading, stopLoading, loading } = useLoading();
    const { updateOrderStatusToFirebase } = useCurrentOrderStore();

    const totalItemPrice = useMemo(() => {
        return order?.order_items.reduce((acc, curr) => acc + Number(curr.order_item_price), 0);
    }, [order]);

    const handleSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus: string = e.target.value;
        setCurrentStatus(selectedStatus);

        onOpen();
    };

    const handleCancelUpdateStatus = (): void => {
        setCurrentStatus(order.order_status);
        onClose();
    };

    const handleUpdateStatus = async (): Promise<void> => {
        try {
            startLoading();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/edit-status/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    order_status: currentStatus,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.status === 200) {
                updateOrderStatusToFirebase(params.id, currentStatus);
                mutate();
                onClose();
                handleDisableStatusItem();

                toast.success("Cập nhật trạng thái đơn hàng thành công", {
                    position: "bottom-center",
                });
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.log("error: ", error);
        } finally {
            stopLoading();
        }
    };

    const handleDisableStatusItem = (): void => {
        const disabledKeys = [];
        switch (currentStatus) {
            case "Đang chờ":
                disabledKeys.push("Đang giao", "Hoàn thành");
                break;
            case "Đang xử lý":
                disabledKeys.push("Đang chờ", "Hoàn thành");
                break;
            case "Đang giao":
                disabledKeys.push("Đang chờ", "Đang xử lý");
                break;
            case "Đã hủy":
                disabledKeys.push("Đang chờ", "Đang xử lý", "Đang giao", "Hoàn thành", "Đã hủy");
                break;
            case "Hoàn thành":
                disabledKeys.push("Đang chờ", "Đang xử lý", "Đang giao", "Hoàn thành", "Đã hủy");
                break;
            default:
                disabledKeys.push("Đang chờ", "Đang xử lý", "Đang giao");
                break;
        }
        setDisabledStatuses(disabledKeys);
    };

    useEffect(() => {
        handleDisableStatusItem();
    }, [currentStatus]);

    useEffect(() => {
        if (order) setCurrentStatus(order.order_status);
    }, [order]);

    return (
        <div>
            <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader></ModalHeader>
                            <ModalBody className="pt-0 px-6 pb-6">
                                <div className="flex flex-col items-center">
                                    {currentStatus === "Đã hủy" ? (
                                        <div className="bg-[#fdd0df] p-4 rounded-full">
                                            <IoIosWarning className="text-[#f31260] text-3xl" />
                                        </div>
                                    ) : (
                                        <div>
                                            <IoInformationCircleSharp className="text-black text-5xl" />
                                        </div>
                                    )}

                                    <h4 className="my-3 text-xl font-bold">Cập nhật trạng thái đơn hàng</h4>
                                    <p className="text-center">
                                        Xác nhận cập nhật trạng thái đơn hàng thành {currentStatus}
                                    </p>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-between">
                                <Button
                                    fullWidth
                                    color="default"
                                    radius="full"
                                    variant="flat"
                                    onPress={handleCancelUpdateStatus}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    isLoading={loading}
                                    fullWidth
                                    className={`${currentStatus === "Đã hủy" ? "bg-danger" : "bg-black"} text-white`}
                                    radius="full"
                                    onPress={handleUpdateStatus}
                                >
                                    {currentStatus === "Đã hủy" ? "Hủy đơn hàng" : "Cập nhật"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="mb-7">
                <Breadcrumbs breadcumbItems={breadcumbItems} />
            </div>
            {isLoading && (
                <div className="grid grid-cols-12 gap-5">
                    <section className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-7 xl:col-span-7 2xl:col-span-7">
                        <div>
                            <Skeleton className="w-full h-[300px] rounded-xl me-3" />
                        </div>
                    </section>
                    <section className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-5 2xl:col-span-5">
                        <div>
                            <div>
                                <Skeleton className="w-full h-[300px] rounded-xl me-3" />
                            </div>
                        </div>
                    </section>
                </div>
            )}
            {!isLoading && order && (
                <div>
                    <div className="grid grid-cols-12 gap-7">
                        <section className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-7 xl:col-span-7 2xl:col-span-7">
                            <div>
                                <div className="p-5 rounded-xl border mb-7">
                                    <div className="flex items-center justify-between mb-5 pb-5 border-b border-dashed">
                                        <h5 className="font-medium text-lg">#{order.id}</h5>

                                        <Select
                                            defaultSelectedKeys={[currentStatus]}
                                            selectedKeys={[currentStatus]}
                                            disabledKeys={disabledStatuses}
                                            color={getOrderStatusColor(order.order_status)}
                                            size="md"
                                            className="max-w-xs"
                                            selectionMode="single"
                                            onChange={handleSelectStatus}
                                        >
                                            {STATUS_LIST.map((status) => (
                                                <SelectItem
                                                    variant="flat"
                                                    color={status === "Đã hủy" ? "danger" : "default"}
                                                    value={status}
                                                    className={`${status === "Đã hủy" && "text-danger"}`}
                                                    key={status}
                                                >
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <p className="mb-3">
                                            Ngày đặt hàng:{" "}
                                            <span className="text-black/55 font-medium">
                                                {formatDateTime(order.order_date)}{" "}
                                            </span>
                                        </p>
                                        <p className="mb-3">
                                            Loại đơn hàng:{" "}
                                            <span className="text-black/55 font-medium capitalize">
                                                {order.order_type}
                                            </span>
                                        </p>
                                        <p>
                                            Phương thức thanh toán:{" "}
                                            <span className="text-black/55 font-medium">
                                                {order.payment_method === "cash"
                                                    ? "Tiền mặt"
                                                    : order.payment_method.toUpperCase()}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="p-5 rounded-xl border">
                                    <h4 className="text-xl font-bold mb-6">Thông tin giao hàng</h4>
                                    <div className="mb-5">
                                        <User
                                            name={order.user_name}
                                            description={order.email}
                                            avatarProps={{
                                                src: order.avatar || "",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="mb-3">
                                            Địa chỉ: <span className="text-black/55 font-medium">{order.address}</span>
                                        </p>
                                        <p className="mb-3">
                                            Người nhận:{" "}
                                            <span className="text-black/55 font-medium">{order.receiver_name}</span>
                                        </p>
                                        <p className="mb-3">
                                            Số điện thoại:{" "}
                                            <span className="text-black/55 font-medium">{order.phone_number}</span>
                                        </p>
                                        <p>
                                            Ghi chú:
                                            <span className="text-black/55 font-medium">{order?.order_note}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-5 2xl:col-span-5">
                            <div className="p-5 rounded-xl border ">
                                <h4 className="text-xl font-bold mb-6">Thông tin thanh toán</h4>
                                <div className="mb-5">
                                    {order.order_items.map((item) => (
                                        <CartItem
                                            isSelected={false}
                                            isDeleted={false}
                                            isEdited={false}
                                            cartItem={item}
                                            key={item.id}
                                        />
                                    ))}
                                </div>

                                <ul>
                                    <li className="flex items-center justify-between py-4 border-b">
                                        <span className="text-sm">Thành tiền</span>
                                        <span>{formatVNCurrency(totalItemPrice)}</span>
                                    </li>
                                    <li className="flex items-center justify-between py-4 border-b">
                                        <span className="text-sm">Phí giao hàng</span>
                                        <span>{formatVNCurrency(order.shipping_cost)}</span>
                                    </li>
                                    <li className="flex items-center justify-between py-4 border-b">
                                        <span className="text-sm">Khuyến mãi</span>
                                    </li>
                                    <li className="flex items-center justify-between pt-4">
                                        <span className="text-sm">Tổng thanh toán</span>
                                        <span className="text-primary">{formatVNCurrency(order.total_payment)}</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
}
