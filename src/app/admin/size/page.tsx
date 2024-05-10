import React from "react";

import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import RouterRefresh from "@/components/UI/RouterRefresh";

import { fetchData } from "@/lib/utils";
import SizeTable from "@/components/Size/SizeTable";
import { ISize } from "@/types/size";
import AddEditSizeButton from "@/components/Size/AddEditSizeButton";

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
        content: "Size",
        href: "/admin/size",
    },
];

export default async function AdminSizePage() {
    const sizeData = await fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/size`);
    const sizes: ISize[] = sizeData.data || [];
    return (
        <div>
            <RouterRefresh />
            <div className="mb-7">
                <Breadcrumbs breadcumbItems={breadcumbItems} />
            </div>
            <div>
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-bold text-xl">Size sản phẩm</h3>
                    <div className="flex items-center justify-end">
                        <AddEditSizeButton
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
                    <SizeTable sizes={sizes} />
                </div>
            </div>
        </div>
    );
}
