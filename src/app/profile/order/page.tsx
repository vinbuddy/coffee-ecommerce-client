"use client";
import React from "react";
import { FaRegHandPointer } from "react-icons/fa";
import { PiCookingPotBold } from "react-icons/pi";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { Tabs, Tab, Card, CardBody, Chip } from "@nextui-org/react";
import CartItem from "@/components/Cart/CartItem";

export const Step = () => {
    return (
        <div>
            <div className="">
                <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                        <div>
                            <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                <FaRegHandPointer />
                            </div>
                        </div>
                        <div className="w-px h-full  border border-dashed" />
                    </div>
                    <div className="pt-1 pb-8">
                        <p className="mb-2 font-medium">Xác nhận đơn hàng</p>
                        <p className="text-gray-700">12:40 pm</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                        <div>
                            <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                <PiCookingPotBold />
                            </div>
                        </div>
                        <div className="w-px h-full  border border-dashed" />
                    </div>
                    <div className="pt-1 pb-8">
                        <p className="mb-2 font-medium">Chuẩn bị món</p>
                        <p className="text-gray-700">12:41 pm</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                        <div>
                            <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                <MdOutlineDeliveryDining className="text-lg" />
                            </div>
                        </div>
                        <div className="w-px h-full  border border-dashed" />
                    </div>
                    <div className="pt-1 pb-8">
                        <p className="mb-2 font-medium">Giao hàng</p>
                        <p className="text-gray-700">13:00 pm</p>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                        <div>
                            <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                <svg
                                    className="w-6 text-gray-600"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <polyline
                                        fill="none"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        points="6,12 10,16 18,8"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="pt-1">
                        <p className="mb-2 font-medium">Hoàn thành</p>
                        <p className="text-gray-700">13: 10 pm</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function UserOrderPage(): React.ReactNode {
    return (
        <div className="rounded-xl">
            <div className="mb-10">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-bold">Đơn hàng hiện tại</h3>
                    <Chip variant="flat">
                        Thời gian dự kiến: 12:40 pm - 13:15 pm
                    </Chip>
                </div>
                <Card shadow="none" className="p-0">
                    <CardBody className="p-0">
                        <Step />
                    </CardBody>
                </Card>
            </div>
            <h3 className="text-xl font-bold mb-5">Các đơn hàng đã mua</h3>
            <div>
                <Tabs variant="underlined" aria-label="Options">
                    <Tab key="all" title="Tất cả">
                        <Card>
                            <CardBody>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab key="complete" title="Đã giao">
                        <Card>
                            <CardBody>
                                <ul>
                                    <CartItem
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
                                    />
                                </ul>
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab key="Shipping" title="Đã hủy">
                        <Card>
                            <CardBody>
                                Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui officia deserunt mollit anim
                                id est laborum.
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
