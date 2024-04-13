"use client";
import CartItem from "@/components/Cart/CartItem";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import CartItemSkeleton from "@/components/UI/CartItemSkeleton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ICart } from "@/types/cart";
import { Button, Image } from "@nextui-org/react";
import React, { useEffect } from "react";
import emptyCartImage from "@/assets/images/empty-cart.png";
import useSWR from "swr";

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
    const { currentUser } = useCurrentUser();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/${currentUser?.id}`;

    const {
        data: cartData,
        isLoading,
        error,
    } = useSWR(url, { revalidateOnMount: true });
    const carts: ICart[] = cartData?.data || [];

    useEffect(() => {
        document.title = "Giỏ hàng của bạn";
    }, []);

    return (
        <div className="container pb-10 min-h-[400px]">
            <div className="px-6 h-full">
                <div className="mb-10">
                    <Breadcrumbs breadcumbItems={breadcumbItems} />
                </div>

                <div className="grid grid-cols-12 h-full gap-10">
                    {/* Products */}
                    <section className="col-span-6 sm:col-span-6 md:col-span-9 lg:col-span-9 xl:col-span-9 2xl:col-span-9">
                        {isLoading ? (
                            <div>
                                {Array.from(
                                    { length: 3 },
                                    (_, index) => index + 1
                                ).map((index) => (
                                    <CartItemSkeleton key={index} />
                                ))}
                            </div>
                        ) : (
                            <ul>
                                {carts.length > 0 ? (
                                    carts.map((cartItem) => (
                                        <CartItem
                                            key={cartItem?.id}
                                            cartItem={cartItem}
                                        />
                                    ))
                                ) : (
                                    <Image
                                        src={emptyCartImage.src}
                                        alt="empty cart"
                                    />
                                )}
                            </ul>
                        )}
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
