import React from "react";

import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import Link from "next/link";
import ProductTable from "@/components/Product/ProductTable";
import { Metadata } from "next";
import OrderTable from "@/components/Order/OrderTable";
import RouterRefresh from "@/components/UI/RouterRefresh";

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/admin",
    },
    {
        content: "Đơn hàng",
        href: "/admin/order",
    },
];

export const metadata: Metadata = {
    title: "Quản lý đơn hàng",
};

export default async function AdminOrderPage() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order`, { method: "GET", cache: "no-cache" });

    const orderData = await response.json();

    return (
        <div>
            <RouterRefresh />
            <div className="mb-7">
                <Breadcrumbs breadcumbItems={breadcumbItems} />
            </div>
            <div>
                <OrderTable orders={orderData.data} />
            </div>
        </div>
    );
}
