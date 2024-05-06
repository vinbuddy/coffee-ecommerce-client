"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody, Chip, Button } from "@nextui-org/react";
import CartItem from "@/components/Cart/CartItem";
import OrderStatusProgress from "@/components/Order/OrderStatusProgress";

export default function UserOrderPage(): React.ReactNode {
    return (
        <div className="rounded-xl">
            <div className="mb-10">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-bold">Đơn hàng hiện tại</h3>
                    <Button size="sm" color="danger" radius="full" variant="flat">
                        Hủy đơn hàng
                    </Button>
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
