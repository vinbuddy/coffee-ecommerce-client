"use client";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Tooltip,
} from "@nextui-org/react";
import Link from "next/link";

import { EyeIcon } from "@/assets/icons";
import { formatDateTime, formatVNCurrency } from "@/lib/utils";
import { renderChipOrderStatus } from "@/lib/utils/render";
import { IOrderInfo } from "@/types";

interface IProps {
    orders: IOrderInfo[];
}

export default function OrderTable({ orders }: IProps): React.ReactNode {
    return (
        <Table color="default" selectionMode="single" removeWrapper aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>Mã đơn hàng</TableColumn>
                <TableColumn>Khách hàng</TableColumn>
                <TableColumn>Ngày đặt</TableColumn>
                <TableColumn>Tổng tiền</TableColumn>
                <TableColumn>Trạng thái</TableColumn>
                <TableColumn>Thao tác</TableColumn>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell>
                            <span className="text-black/60">#{order.id}</span>
                        </TableCell>
                        <TableCell>
                            <User
                                avatarProps={{
                                    radius: "lg",
                                    src: order?.avatar || "",
                                }}
                                description={order?.email || ""}
                                name={order?.user_name || "No name"}
                            ></User>
                        </TableCell>

                        <TableCell>{formatDateTime(order.order_date)}</TableCell>
                        <TableCell>{formatVNCurrency(order.total_payment)}</TableCell>
                        <TableCell>{renderChipOrderStatus(order.order_status)}</TableCell>
                        <TableCell>
                            <div className="relative flex items-center gap-x-4">
                                <Tooltip content="Chi tiết">
                                    <Link
                                        href={`/admin/order/${order.id}`}
                                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                    >
                                        <EyeIcon />
                                    </Link>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
