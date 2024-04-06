import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Button,
    Input,
    Pagination,
} from "@nextui-org/react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import Link from "next/link";
import ProductTable from "@/components/Product/ProductTable";

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/admin",
    },
    {
        content: "Sản phẩm",
        href: "/admin/product",
    },
];

export default async function AdminProductPage() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product`,
        { method: "GET", cache: "no-cache" }
    );

    const productData = await response.json();

    return (
        <div>
            <div className="mb-7">
                <Breadcrumbs breadcumbItems={breadcumbItems} />
            </div>

            <div className="rounded-xl">
                {/* Search, Add new   */}
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-bold text-xl">Sản phẩm</h3>
                    <div className="flex items-center justify-end">
                        <Input
                            isClearable
                            classNames={{
                                base: "w-full sm:max-w-[60%]",
                                inputWrapper: "border-1",
                            }}
                            placeholder="Tìm tên sản phẩm"
                            size="md"
                            startContent={<CiSearch />}
                            variant="bordered"
                            radius="sm"
                        />
                        <Button
                            as={Link}
                            href="/admin/product/new"
                            radius="sm"
                            endContent={<AiOutlinePlus />}
                            className="bg-black text-white ms-3"
                        >
                            Thêm mới
                        </Button>
                    </div>
                </div>
                <ProductTable products={productData.data} />
                {/* Bottom pagination */}
                {/* <div className="mt-5 flex justify-center">
                    <Pagination
                        classNames={{
                            cursor: " bg-black text-white",
                        }}
                        showControls
                        total={10}
                        initialPage={1}
                        variant="light"
                    />
                </div> */}
            </div>
        </div>
    );
}
