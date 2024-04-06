"use client";
import { DeleteIcon, EditIcon, EyeIcon } from "@/assets/icons";
import { formatVNCurrency } from "@/lib/utils";
import { IProduct } from "@/types/product";
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
    products: IProduct[];
}

export default function ProductTable({ products }: IProps): React.ReactNode {
    return (
        <Table
            color="default"
            selectionMode="single"
            removeWrapper
            aria-label="Example static collection table"
        >
            <TableHeader>
                <TableColumn>Tên sản phẩm</TableColumn>
                <TableColumn>Giá</TableColumn>
                <TableColumn>Trạng thái</TableColumn>
                <TableColumn>Thao tác</TableColumn>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>
                            <User
                                avatarProps={{
                                    radius: "lg",
                                    src: product?.image || "",
                                }}
                                name={product?.name || "No name"}
                            ></User>
                        </TableCell>

                        <TableCell>
                            {formatVNCurrency(product?.price) || 0}
                        </TableCell>
                        <TableCell>
                            {product.status === 1 ? (
                                <Chip color="success" variant="flat">
                                    Còn
                                </Chip>
                            ) : (
                                <Chip color="danger" variant="flat">
                                    Hết
                                </Chip>
                            )}
                        </TableCell>
                        <TableCell>
                            <div className="relative flex items-center gap-x-4">
                                <Tooltip content="Chi tiết">
                                    <Link
                                        href={`/admin/product/${product.id}`}
                                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                    >
                                        <EyeIcon />
                                    </Link>
                                </Tooltip>
                                <Tooltip content="Chỉnh sửa">
                                    <Link
                                        href=""
                                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                    >
                                        <EditIcon />
                                    </Link>
                                </Tooltip>
                                <Tooltip color="danger" content="Xóa">
                                    <Link
                                        href=""
                                        className="text-lg text-danger cursor-pointer active:opacity-50"
                                    >
                                        <DeleteIcon />
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
