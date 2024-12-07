"use client";
import { Image } from "@nextui-org/react";
import { useEffect } from "react";
import useSWR from "swr";

import emptyProduct from "@/assets/images/empty-product.png";
import WishlistCard from "@/components/Wishlist/WishlistCard";
import { IWishList } from "@/types";
import { useCurrentUser } from "@/hooks";

export default function WishlistPage() {
    const { currentUser } = useCurrentUser();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/${currentUser?.id}`;
    const { data: wishlistData, isLoading, error } = useSWR(url);

    const wishlist: IWishList[] = wishlistData?.data || [];

    useEffect(() => {
        document.title = "Sản phẩm yêu thích";
    }, []);

    return (
        <div className="pb-10 min-h-[400px]">
            <div className="h-full">
                <h1 className="text-xl font-bold mb-7">Sản phẩm yêu thích của bạn</h1>

                {!isLoading && wishlist.length === 0 && (
                    <div className="flex items-center justify-center flex-col">
                        <Image className="w-full" src={emptyProduct.src} alt="empty product" />
                        <p className="mt-5 text-gray-500 text-lg">Không tìm thấy sản phẩm</p>
                    </div>
                )}

                <div>
                    {!isLoading && wishlist.length > 0 && (
                        <div className="grid grid-cols-12 gap-5">
                            {wishlist.map((wishlistItem) => (
                                <div
                                    key={wishlistItem?.id}
                                    className="flex flex-col col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3"
                                >
                                    <WishlistCard wishlistItem={wishlistItem} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
