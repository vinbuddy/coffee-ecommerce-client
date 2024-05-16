"use client";
import { EditIcon } from "@/assets/icons";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button } from "@nextui-org/react";

import { ITopping } from "@/types/topping";
import { formatVNCurrency } from "@/lib/utils";

interface IProps {
    toppings: ITopping[];
}

export default function ToppingTable({ toppings }: IProps): React.ReactNode {
    return (
        <Table color="default" selectionMode="single" removeWrapper aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>#</TableColumn>
                <TableColumn>Tên topping</TableColumn>
                <TableColumn>Giá</TableColumn>
            </TableHeader>
            <TableBody>
                {toppings.map((topping, index) => (
                    <TableRow key={topping.id}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{topping.topping_name || "No name"}</TableCell>
                        <TableCell>{formatVNCurrency(topping.topping_price)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
