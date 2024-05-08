"use client";
import { realTimeDb } from "@/config/firebase";
import useCurrentOrderStore from "@/hooks/useCurrentOrderStore";
import { formatDateTime } from "@/lib/utils";
import { ICurrentOrder, IOrderStatus } from "@/types/order";
import { Chip, Tooltip } from "@nextui-org/react";
import { get, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { FaRegHandPointer } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { PiCookingPotBold } from "react-icons/pi";
import { IoMdCheckmark } from "react-icons/io";

interface IProps {
    orderId: string;
}

const orderStatuses = [
    { status: "Đang chờ", label: "Xác nhận đơn hàng", icon: <FaRegHandPointer /> },
    { status: "Đang xử lý", label: "Chuẩn bị món", icon: <PiCookingPotBold /> },
    { status: "Đang giao", label: "Giao hàng", icon: <MdOutlineDeliveryDining /> },
    {
        status: "Hoàn thành",
        label: "Hoàn thành",
        icon: <IoMdCheckmark />,
    },
];

export default function OrderDetailStatusProgress({ orderId }: IProps) {
    const [currentOrder, setCurrentOrder] = useState<ICurrentOrder | null>(null);
    const [currentStatusIndex, setCurrentStatusIndex] = useState<number>(0);
    useEffect(() => {
        if (currentOrder) {
            const lastStatus = currentOrder?.statuses[currentOrder?.statuses.length - 1].status;
            const _currentStatusIndex = orderStatuses.findIndex((status) => status.status === lastStatus);
            setCurrentStatusIndex(_currentStatusIndex);
        }
    }, [currentOrder]);

    useEffect(() => {
        const orderDetailRef = ref(realTimeDb, `orders/${orderId}`);

        onValue(
            orderDetailRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const orderData = snapshot.val();

                    if (orderData) {
                        const statuses = Object.values(orderData.statuses) as IOrderStatus[];
                        statuses.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

                        const order: ICurrentOrder = {
                            userId: orderData.userId,
                            orderId: orderId,
                            statuses: statuses,
                            isCompleted: orderData.isCompleted,
                        };

                        setCurrentOrder(order);
                    }
                } else {
                    console.log("No data available for this order");
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);

    return (
        <div>
            <div>
                {orderStatuses.map((status, index) => {
                    const statusDateTime: string | undefined = currentOrder?.statuses.find(
                        (s: { status: string }) => s.status === status.status
                    )?.time;
                    const statusTime: string | undefined = statusDateTime?.split(" ")[1];
                    return (
                        <div className={`flex ${index <= currentStatusIndex ? "active" : ""}`} key={status.status}>
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 border rounded-full ${
                                            index <= currentStatusIndex ? "bg-black/85 text-white" : "bg-white"
                                        }`}
                                    >
                                        {status.icon}
                                    </div>
                                </div>
                                {index < orderStatuses.length - 1 && (
                                    <div
                                        className={`w-px h-full  border border-dashed ${
                                            index < currentStatusIndex ? "border-black/85" : ""
                                        }`}
                                    />
                                )}
                            </div>
                            <div className="pt-1 pb-8">
                                <p
                                    className={`mb-2 font-medium ${
                                        index <= currentStatusIndex ? "text-black/85" : "text-gray-700 "
                                    }`}
                                >
                                    {status.label}
                                </p>
                                {statusDateTime && statusTime ? (
                                    <Tooltip
                                        color="foreground"
                                        placement="right-end"
                                        content={formatDateTime(statusDateTime || "")}
                                    >
                                        <span className="text-gray-700">{statusTime || ""}</span>
                                    </Tooltip>
                                ) : (
                                    <p className="invisible">Temp time</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
