"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody, Chip, Button } from "@nextui-org/react";
import CartItem from "@/components/Cart/CartItem";
import OrderStatusProgress from "@/components/Order/OrderStatusProgress";
import CancelOrderButton from "@/components/Order/CancelOrderButton";
import useCurrentOrderStore from "@/hooks/useCurrentOrderStore";
import CompleteOrderButton from "@/components/Order/CompleteOrderButton";
import { toast } from "sonner";
import useSWR from "swr";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function UserOrderPage(): React.ReactNode {
    const { currentOrder } = useCurrentOrderStore();
    const { currentUser } = useCurrentUser();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/user-order/${currentUser?.id}`;
    const { data: orderData, isLoading, error, mutate } = useSWR(url);

    const lastStatus = currentOrder?.statuses[currentOrder?.statuses.length - 1].status;
    const isCancelable = currentOrder?.statuses.length === 1 && lastStatus === "Đang chờ";
    const isCompletable = lastStatus === "Hoàn thành";

    return (
        <div className="rounded-xl">
            <div className="mb-10">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-bold">Đơn hàng hiện tại</h3>
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
                    {isCompletable ? (
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
                    )}
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
                        <Card>
                            <CardBody>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab key="complete" title="Đã giao">
                        <Card>
                            <CardBody>
                                <ul>
                                    {/* <CartItem
                                        isSelected={false}
                                        isDeleted={false}
                                        isEdited={false}
                                        cartItem={{}}
                                    />
                                    <CartItem
                                        isSelected={false}
                                        isDeleted={false}
                                        isEdited={false}
                                        cartItem={{}}
                                    /> */}
                                </ul>
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab key="Shipping" title="Đã hủy">
                        <Card>
                            <CardBody>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
