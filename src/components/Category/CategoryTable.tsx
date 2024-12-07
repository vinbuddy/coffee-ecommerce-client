"use client";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button } from "@nextui-org/react";

import AddEditCategoryButton from "./AddEditCategoryButton";
import { EditIcon } from "@/assets/icons";
import { ICategory } from "@/types";

interface IProps {
    categories: ICategory[];
}

export default function CategoryTable({ categories }: IProps): React.ReactNode {
    return (
        <Table color="default" selectionMode="single" removeWrapper aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>#</TableColumn>
                <TableColumn>Tên danh mục</TableColumn>
                <TableColumn>Thao tác</TableColumn>
            </TableHeader>
            <TableBody>
                {categories.map((category, index) => (
                    <TableRow key={category.id}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{category.category_name || "No name"}</TableCell>
                        <TableCell>
                            <Tooltip color="foreground" content="Chỉnh sửa" placement="right">
                                <AddEditCategoryButton
                                    buttonProps={{
                                        color: "default",
                                        variant: "light",
                                        radius: "full",
                                        size: "md",
                                        isIconOnly: true,
                                        children: <EditIcon />,
                                    }}
                                    categoryId={category.id}
                                    categoryValue={category.category_name}
                                />
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
