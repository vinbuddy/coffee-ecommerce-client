"use client";
import { EditIcon } from "@/assets/icons";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button } from "@nextui-org/react";

import { ISize } from "@/types/size";

interface IProps {
    sizes: ISize[];
}

export default function SizeTable({ sizes }: IProps): React.ReactNode {
    return (
        <Table color="default" selectionMode="single" removeWrapper aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>#</TableColumn>
                <TableColumn>Tên size</TableColumn>
            </TableHeader>
            <TableBody>
                {sizes.map((size, index) => (
                    <TableRow key={size.id}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{size.size_name || "No name"}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
