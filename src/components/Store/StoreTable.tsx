"use client";
import { DeleteIcon, EditIcon, EyeIcon } from "@/assets/icons";
import { formatVNCurrency } from "@/lib/utils";
import { IStore } from "@/types/store";
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

interface IProps {
    stores: IStore[];
}

export default function StoreTable({ stores }: IProps): React.ReactNode {
    return (
        <Table color="default" selectionMode="single" removeWrapper aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>Tên cửa hàng</TableColumn>
                <TableColumn>Giờ mở cửa</TableColumn>
                <TableColumn>Địa chỉ</TableColumn>
                <TableColumn>Thành phố</TableColumn>
                <TableColumn>Thao tác</TableColumn>
            </TableHeader>
            <TableBody>
                {stores.map((store) => (
                    <TableRow key={store.id}>
                        <TableCell>
                            <User
                                avatarProps={{
                                    radius: "lg",
                                    src: store?.image || "",
                                }}
                                name={store?.store_name || "No name"}
                            ></User>
                        </TableCell>

                        <TableCell>
                            <Chip color="default" variant="flat">
                                {store.open_time} - {store.close_time}
                            </Chip>
                        </TableCell>
                        <TableCell>{store.address || "No address"}</TableCell>
                        <TableCell>{store.city || "No city"}</TableCell>
                        <TableCell>
                            <div className="relative flex items-center gap-x-4">
                                <Tooltip content="Chỉnh sửa">
                                    <Link
                                        href={`/admin/store/${store.id}`}
                                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                    >
                                        <EditIcon />
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
