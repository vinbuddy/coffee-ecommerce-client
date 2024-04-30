"use client";
import { IOrder } from "@/types/order";
import { Button, Image, Link as NextUILink } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import momoIcon from "@/assets/images/momo-icon.png";
import vnpayIcon from "@/assets/images/vnpay-icon.png";
import emptySearch from "@/assets/images/empty-search.png";
import useLoading from "@/hooks/useLoading";
import { useRouter } from "next/navigation";
import { MOMO_MESSAGE, VNPAY_MESSAGE } from "@/lib/constants";
import { IoIosWarning } from "react-icons/io";

type OrderType = Omit<IOrder, "order_date" | "order_status">;

export default function OnlineCheckoutPage({ searchParams }: { searchParams: any }): React.ReactNode {
    const [order, setOrder] = useState<OrderType | null>(() => {
        const orderStorage = localStorage.getItem("order");

        if (orderStorage) {
            const orderInfo: OrderType = orderStorage && JSON.parse(orderStorage);
            return orderInfo;
        }

        return null;
    });
    const { startLoading, stopLoading, loading } = useLoading();
    const [checkoutURL, setCheckoutURL] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>("");
    const router = useRouter();

    // Init order state
    useEffect(() => {
        if (!order && searchParams?.encodedOrderInfo && searchParams?.encodedOrderItems) {
            const onderInfo: Omit<IOrder, "order_items" | "order_date" | "order_status"> = JSON.parse(
                decodeURIComponent(searchParams.encodedOrderInfo)
            );
            const onderItems = JSON.parse(decodeURIComponent(searchParams.encodedOrderItems));

            const orderData = {
                ...onderInfo,
                order_items: onderItems,
            };

            setOrder(orderData);
            localStorage.setItem("order", JSON.stringify(orderData));
        }
    }, []);

    // Call api to get checkout url
    useEffect(() => {
        (async () => {
            try {
                if (!order) return;

                let url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/vnpay`;
                if (order.payment_method === "momo") {
                    url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/momo`;
                }

                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        total_payment: order.total_payment,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (response.status === 200) {
                    setCheckoutURL(data.payment_url);
                }
            } catch (error) {
            } finally {
            }
        })();
    }, [order]);

    // After redirected from MOMO or VNPAY
    useEffect(() => {
        const statusCode = searchParams?.vnp_ResponseCode?.toString() || searchParams?.resultCode?.toString();
        if (!statusCode || !order) return;

        // Success
        if (statusCode == "00" || statusCode == "0") {
            handleCreateOrder();
        } else {
            const message = order.payment_method === "momo" ? MOMO_MESSAGE[statusCode] : VNPAY_MESSAGE[statusCode];
            setErrorMessage(message);
        }
    }, []);

    const handleCreateOrder = async (): Promise<void> => {
        if (!order) return;

        try {
            startLoading();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order`, {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resData = await response.json();

            if (response.status === 200) {
                localStorage.removeItem("order");

                const resOrder: IOrder = resData.data;
                const orderDate = resOrder.order_date;

                router.push(`/checkout/result?orderId=${resOrder.id}&orderDate=${orderDate}`);
            } else {
                throw new Error(resData.message);
            }
        } catch (error: any) {
            console.log("error: ", error.message);
        } finally {
            stopLoading();
        }
    };

    return (
        <div className="container pb-10 min-h-[350px]">
            <div className="px-6 h-full">
                <div className="flex items-center justify-center h-full">
                    {!loading && !order && (
                        <div className="flex flex-col items-center">
                            <Image className="w-[150px]" src={emptySearch.src} alt="Payment method image" />
                            <p className="mb-3 text-xl font-bold">Không có yêu cầu thanh toán nào</p>
                            <Button as={Link} href="/" fullWidth radius="full">
                                Về trang chủ
                            </Button>
                        </div>
                    )}
                    {!!order && !errorMessage && (
                        <div className="flex flex-col items-center p-5 rounded-2xl shadow-sm">
                            <Image
                                className="w-[100px]"
                                src={order?.payment_method === "momo" ? momoIcon.src : vnpayIcon.src}
                                alt="Payment method image"
                            />
                            <h4 className="mt-3 text-xl font-bold">
                                Thanh toán bằng {order?.payment_method.toLocaleUpperCase()}
                            </h4>

                            <p className="mt-1.5 mb-4">
                                Sau khi xác nhận thanh toán sẽ chuyển hướng bạn đến trang thanh toán của{" "}
                                {order?.payment_method.toLocaleUpperCase()}
                            </p>

                            <Button
                                as={Link}
                                href={checkoutURL}
                                isLoading={loading}
                                isDisabled={checkoutURL.length <= 0}
                                fullWidth
                                radius="full"
                                className={`${
                                    order?.payment_method === "momo" ? "bg-[#d82d8b]" : "bg-[#0462ab]"
                                } text-white`}
                            >
                                Thanh toán
                            </Button>

                            <NextUILink
                                isExternal
                                href="https://the-cooffe-house-api.notion.site/MOMO-VNPAY-Test-Accounts-60b0cc23b23f4507a694aeefd8389ce2?pvs=74"
                                className="text-[#0071e3] mt-4"
                            >
                                🏦 Xem tài khoản test
                            </NextUILink>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="flex flex-col items-center">
                            <div className="bg-[#fdd0df] p-4 rounded-full">
                                <IoIosWarning className="text-[#f31260] text-3xl" />
                            </div>
                            <h4 className="mt-3 text-xl font-bold">Giao dịch không thành công</h4>

                            <p className="mt-1.5 mb-4">{errorMessage}</p>
                            <Button
                                as={Link}
                                href={checkoutURL}
                                isLoading={loading}
                                isDisabled={checkoutURL.length <= 0}
                                fullWidth
                                radius="full"
                                className={`${
                                    order?.payment_method === "momo" ? "bg-[#d82d8b]" : "bg-[#0462ab]"
                                } text-white`}
                            >
                                Thanh toán lại
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
