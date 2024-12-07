"use client";
import React, { useEffect, useMemo } from "react";
import { Button, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import CartItem from "@/components/Cart/CartItem";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import CartItemSkeleton from "@/components/UI/CartItemSkeleton";
import emptyCartImage from "@/assets/images/empty-cart.png";
import { ICart } from "@/types";
import { formatVNCurrency } from "@/lib/utils";
import { useCartStore, useCurrentUser } from "@/hooks";

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
    const router = useRouter();
    const { currentUser } = useCurrentUser();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/${currentUser?.id}`;
    const { selectedCartItems, clearSelectedCartItems } = useCartStore();

    const { data: cartData, isLoading, error } = useSWR(url, { revalidateOnMount: true });
    const carts: ICart[] = cartData?.data || [];

    const totalPayment = useMemo(() => {
        return selectedCartItems.reduce((acc, curr) => acc + Number(curr.order_item_price), 0);
    }, [selectedCartItems]);

    const handleNavigateToCheckout = (): void => {
        // Add selected items to localstorage
        const prevCart = localStorage.getItem("cart");

        // Remove pre items
        if (prevCart) localStorage.removeItem("cart");

        if (selectedCartItems.length > 0) {
            localStorage.setItem("cart", JSON.stringify(selectedCartItems));

            // clear selected items state
            clearSelectedCartItems();

            // Navigate to checkout page
            router.push("/checkout");
        }
    };

    useEffect(() => {
        document.title = "Giỏ hàng của bạn";

        return () => {
            // clear selected cart item
            clearSelectedCartItems();
        };
    }, []);

    return (
        <div className="container pb-10 min-h-[400px]">
            <div className="px-6 h-full">
                <div className="mb-10">
                    <Breadcrumbs breadcumbItems={breadcumbItems} />
                </div>

                <div className="grid grid-cols-12 h-full gap-0 sm:gap-0 md:gap-0 lg:gap-20">
                    {/* Products */}
                    <section className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-7 xl:col-span-7 2xl:col-span-7 pb-5">
                        {isLoading ? (
                            <div>
                                {Array.from({ length: 3 }, (_, index) => index + 1).map((index) => (
                                    <CartItemSkeleton key={index} />
                                ))}
                            </div>
                        ) : (
                            <ul className="">
                                {carts.length > 0 ? (
                                    carts.map((cartItem) => <CartItem key={cartItem?.id} cartItem={cartItem} />)
                                ) : (
                                    <div className="flex items-center justify-center flex-col">
                                        <Image
                                            classNames={{
                                                img: "grayscale",
                                            }}
                                            className="w-[250px]"
                                            src={emptyCartImage.src}
                                            alt="empty cart"
                                        />
                                        <p className="mt-1 text-gray-500 text-lg">Giỏ hàng của bạn đang trống</p>
                                    </div>
                                )}
                            </ul>
                        )}
                    </section>

                    <section className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-5 xl:col-span-5 2xl:col-span-5 mt-10 lg:mt-0">
                        <aside className="sticky top-[80px] z-[1]">
                            <div className="">
                                <p className="flex justify-between items-center mb-3 border-b pb-3">
                                    <span className="text-black/70">Số món đã chọn:</span>
                                    &nbsp;
                                    <b>{selectedCartItems.length} </b>
                                </p>
                                <p className="flex justify-between items-center mb-4">
                                    <span className="text-black/70">Tổng tiền thanh toán:</span>
                                    &nbsp;
                                    <b id="total-payment">{formatVNCurrency(totalPayment)}</b>
                                </p>
                                <Button
                                    isDisabled={selectedCartItems.length <= 0}
                                    onClick={handleNavigateToCheckout}
                                    radius="full"
                                    className="w-full"
                                    color="primary"
                                >
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
