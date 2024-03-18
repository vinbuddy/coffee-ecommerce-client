import CartItem from "@/components/Cart/CartItem";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import { Button } from "@nextui-org/react";
import React from "react";

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/",
    },
    {
        content: "Giỏ hàng",
        href: "/cart",
    },
];

export default function CartPage(): React.ReactNode {
    return (
        <div className="container pb-10 min-h-[400px]">
            <div className="px-6 h-full">
                <div className="mb-10">
                    <Breadcrumbs breadcumbItems={breadcumbItems} />
                </div>

                <div className="grid grid-cols-12 h-full gap-10">
                    {/* Products */}
                    <section className="col-span-6 sm:col-span-6 md:col-span-9 lg:col-span-9 xl:col-span-9 2xl:col-span-9">
                        <ul>
                            <CartItem cartItem={{}} />
                            <CartItem cartItem={{}} />
                        </ul>
                    </section>

                    <section className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                        <aside className="sticky top-[80px] z-[1]">
                            <div className="rounded-xl shadow p-4 border">
                                <p className="mb-3">
                                    Tổng tiền thanh toán:{" "}
                                    <b id="total-payment">0 </b> <b>Đ</b>
                                </p>
                                <Button className="w-full" color="primary">
                                    Mua hàng
                                </Button>
                            </div>
                        </aside>
                    </section>
                </div>
            </div>
        </div>
    );
}
