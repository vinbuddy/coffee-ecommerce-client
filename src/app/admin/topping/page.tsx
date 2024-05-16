import React from "react";

import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import RouterRefresh from "@/components/UI/RouterRefresh";

import { fetchData } from "@/lib/utils";
import { ITopping } from "@/types/topping";
import ToppingTable from "@/components/Topping/ToppingTable";
import AddEditToppingButton from "@/components/Topping/AddEditToppingButton";

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
        content: "Topping",
        href: "/admin/topping",
    },
];

export default async function AdminToppingPage() {
    const toppingData = await fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topping`);
    const toppings: ITopping[] = toppingData.data || [];

    return (
        <div>
            <RouterRefresh />
            <div className="mb-7">
                <Breadcrumbs breadcumbItems={breadcumbItems} />
            </div>
            <div>
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-bold text-xl">Topping của sản phẩm</h3>
                    <div className="flex items-center justify-end">
                        <AddEditToppingButton
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
                    <ToppingTable toppings={toppings} />
                </div>
            </div>
        </div>
    );
}
