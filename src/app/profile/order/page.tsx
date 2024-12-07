"use client";
import React, { useEffect } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { toast } from "sonner";
import useSWR from "swr";

import OrderStatusProgress from "@/components/Order/OrderStatusProgress";
import CancelOrderButton from "@/components/Order/CancelOrderButton";
import CompleteOrderButton from "@/components/Order/CompleteOrderButton";
import OrderCard from "@/components/Order/OrderCard";
import { IOrder } from "@/types";
import { useCurrentUser, useCurrentOrderStore } from "@/hooks";

export default function UserOrderPage(): React.ReactNode {
    const { currentOrder } = useCurrentOrderStore();
    const { currentUser } = useCurrentUser();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/user-order/${currentUser?.id}`;
    const { data: orderData, mutate } = useSWR(url);
    const orders: IOrder[] = orderData?.data || [];

    const lastStatus = currentOrder?.statuses[currentOrder?.statuses.length - 1].status;
    const isCancelable = currentOrder?.statuses.length === 1 && lastStatus === "Đang chờ";
    const isCompletable = lastStatus === "Hoàn thành";

    useEffect(() => {
        document.title = "Đơn hàng của bạn";
    }, []);

    return (
        <div className="rounded-xl">
            <div className="mb-10">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-bold">Đơn hàng hiện tại</h3>
                    <div className="flex items-center">
                        {isCancelable && (
                            <CancelOrderButton
                                orderId={currentOrder?.orderId}
                                onAfterCanceled={() => {
                                    toast.success("Đã hủy đơn hàng", {
                                        position: "bottom-center",
                                    });
                                }}
                            />
                        )}
                        {isCompletable && (
                            <CompleteOrderButton
                                orderId={currentOrder?.orderId}
                                onAfterCompleted={() => {
                                    toast.success("Đã hoàn thành đơn hàng", {
                                        position: "bottom-center",
                                    });
                                }}
                            />
                        )}
                        {/* {isCompletable ? (
                            <CompleteOrderButton
                                orderId={currentOrder?.orderId}
                                onAfterCompleted={() => {
                                    toast.success("Đã hoàn thành đơn hàng", {
                                        position: "bottom-center",
                                    });
                                }}
                            />
                        ) : (
                            <Button isDisabled>Hoàn thành đơn hàng</Button>
                        )} */}
                    </div>
                </div>
                <Card shadow="none" className="p-0">
                    <CardBody className="p-0">
                        <OrderStatusProgress />
                    </CardBody>
                </Card>
            </div>
            <h3 className="text-xl font-bold mb-5">Các đơn hàng đã mua</h3>
            <div>
                <Tabs variant="underlined" aria-label="Options">
                    <Tab key="all" title="Tất cả">
                        {orders.map((order) => (
                            <Card key={order?.id} className="mb-5 last:mb-0 px-4">
                                <CardBody>
                                    <OrderCard order={order} />
                                </CardBody>
                            </Card>
                        ))}
                    </Tab>

                    <Tab key="complete" title="Đã giao">
                        {orders.map((order) => {
                            if (order.order_status === "Hoàn thành") {
                                return (
                                    <Card key={order.id} className="mb-5 last:mb-0 px-4">
                                        <CardBody>
                                            <OrderCard order={order} />
                                        </CardBody>
                                    </Card>
                                );
                            }
                        })}
                    </Tab>

                    <Tab key="Cancel" title="Đã hủy">
                        {orders.map((order) => {
                            if (order.order_status === "Đã hủy") {
                                return (
                                    <Card key={order.id} className="mb-5 last:mb-0 px-4">
                                        <CardBody>
                                            <OrderCard order={order} />
                                        </CardBody>
                                    </Card>
                                );
                            }
                        })}
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
