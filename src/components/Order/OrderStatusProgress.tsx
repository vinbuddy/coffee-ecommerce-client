"use client";
import useCurrentOrderStore from "@/hooks/useCurrentOrderStore";
import { formatDateTime, formatTimeToAmPm } from "@/lib/utils";
import { Chip, Tooltip } from "@nextui-org/react";
import { FaRegHandPointer } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { PiCookingPotBold } from "react-icons/pi";

const orderStatuses = [
    { status: "Đang chờ", label: "Xác nhận đơn hàng", icon: <FaRegHandPointer /> },
    { status: "Đang xử lý", label: "Chuẩn bị món", icon: <PiCookingPotBold /> },
    { status: "Đang giao", label: "Giao hàng", icon: <MdOutlineDeliveryDining /> },
    {
        status: "Hoàn thành",
        label: "Hoàn thành",
        icon: (
            <svg className="w-6 text-gray-600" stroke="currentColor" viewBox="0 0 24 24">
                <polyline
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    points="6,12 10,16 18,8"
                />
            </svg>
        ),
    },
];

export default function OrderStatusProgress() {
    const { currentOrder } = useCurrentOrderStore();
    const lastStatus = currentOrder?.statuses[currentOrder?.statuses.length - 1].status;
    const currentStatusIndex = orderStatuses.findIndex((status) => status.status === lastStatus);

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
                                        index <= currentStatusIndex ? "text-black/85" : "text-gray-700"
                                    }`}
                                >
                                    {status.label}
                                </p>
                                {statusDateTime && statusTime && (
                                    <Tooltip
                                        color="foreground"
                                        placement="right-end"
                                        content={formatDateTime(statusDateTime || "")}
                                    >
                                        <span className="text-gray-700">{formatTimeToAmPm(statusTime) || ""}</span>
                                    </Tooltip>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
