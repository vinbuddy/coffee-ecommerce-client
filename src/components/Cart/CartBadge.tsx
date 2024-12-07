"use client";
import { Badge, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useEffect } from "react";

import { CiCoffeeCup } from "react-icons/ci";
import { useCartStore, useCurrentUser } from "@/hooks";

export default function CartBadge() {
    const { totalItem } = useCartStore();
    const { currentUser } = useCurrentUser();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/total/${currentUser?.id}`, {
                    method: "GET",
                });

                const resData = await response.json();
                const count: number = resData?.data;

                useCartStore.setState(() => ({
                    totalItem: count || 0,
                }));
            } catch (error: any) {}
        })();
    }, [currentUser]);

    return (
        <Tooltip content="Giỏ hàng" placement="bottom" closeDelay={0}>
            <Link href="/cart" className="relative">
                <Badge color="danger" content={totalItem} size="md" shape="circle">
                    <CiCoffeeCup size={28} />
                </Badge>
            </Link>
        </Tooltip>
    );
}
