import React from "react";
import { Button, Pagination } from "@nextui-org/react";
import { AiOutlinePlus } from "react-icons/ai";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import Link from "next/link";
import { Metadata } from "next";
import StoreTable from "@/components/Store/StoreTable";

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/admin",
    },
    {
        content: "Cửa hàng",
        href: "/admin/store",
    },
];

export const metadata: Metadata = {
    title: "Quản lý cửa hàng",
};

export default async function AdminStorePage() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/store`, {
        method: "GET",
        cache: "no-cache",
    });

    const storeData = await response.json();

    return (
        <div>
            <div className="mb-7">
                <Breadcrumbs breadcumbItems={breadcumbItems} />
            </div>

            <div className="rounded-xl">
                {/* Search, Add new   */}
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-bold text-xl">Cửa hàng</h3>
                    <div className="flex items-center justify-end">
                        <Button
                            as={Link}
                            href="/admin/store/new"
                            radius="sm"
                            endContent={<AiOutlinePlus />}
                            className="bg-black text-white ms-3"
                        >
                            Thêm mới
                        </Button>
                    </div>
                </div>
                <StoreTable stores={storeData.data} />
            </div>
        </div>
    );
}
