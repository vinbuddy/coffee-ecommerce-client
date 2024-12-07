import React from "react";

import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import CategoryTable from "@/components/Category/CategoryTable";
import AddEditCategoryButton from "@/components/Category/AddEditCategoryButton";
import RouterRefresh from "@/components/UI/RouterRefresh";
import { fetchData } from "@/lib/utils";
import { ICategory } from "@/types";

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/admin",
    },
    {
        content: "Sản phẩm",
        href: "/admin/product",
    },
    {
        content: "Danh mục",
        href: "/admin/category",
    },
];

export default async function AdminCategoryPage() {
    const categoryData = await fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`);
    const categories: ICategory[] = categoryData.data || [];
    return (
        <div>
            <RouterRefresh />
            <div className="mb-7">
                <Breadcrumbs breadcumbItems={breadcumbItems} />
            </div>
            <div>
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-bold text-xl">Danh mục sản phẩm</h3>
                    <div className="flex items-center justify-end">
                        <AddEditCategoryButton
                            buttonProps={{
                                className: "bg-black text-white ms-3",
                                radius: "sm",
                                size: "md",
                                children: "Thêm mới",
                            }}
                        />
                    </div>
                </div>
                <div>
                    <CategoryTable categories={categories} />
                </div>
            </div>
        </div>
    );
}
