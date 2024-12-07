"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { GoHeart, GoHeartFill } from "react-icons/go";

import { useCurrentUser } from "@/hooks";

interface IProps {
    isAdded?: boolean;
    productId?: number;
    wishlistItemId?: number;
    isIcon?: boolean;
}

export default function AddToWishlistButton({ isAdded = true, productId, wishlistItemId, isIcon = false }: IProps) {
    const [added, setAdded] = useState<boolean>(isAdded);
    const { currentUser } = useCurrentUser();

    const addToWishlist = async (): Promise<void> => {
        setAdded(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_id: productId,
                    user_id: currentUser?.id,
                }),
            });

            const resData = await response.json();

            if (response.status === 200) {
                toast.success("Đã thêm vào yêu thích", {
                    position: "bottom-center",
                });
                mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/${currentUser?.id}`);
            } else {
                throw new Error(resData.message);
            }
        } catch (error: any) {
            toast.error("Có lỗi xảy ra", {
                position: "bottom-center",
                description: error.message,
            });
            setAdded(false);
        }
    };

    const removeToWishlist = async (): Promise<void> => {
        setAdded(false);
        try {
            if (!wishlistItemId) {
                throw new Error("wishlistItemId is undefined");
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/${wishlistItemId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resData = await response.json();

            if (response.status === 200) {
                // mutate
                toast.success("Đã xóa khỏi yêu thích", {
                    position: "bottom-center",
                });
                mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/${currentUser?.id}`);
            } else {
                throw new Error(resData.message);
            }
        } catch (error: any) {
            toast.error("Có lỗi xảy ra", {
                position: "bottom-center",
                description: error.message,
            });
            setAdded(true);
        }
    };

    const handleAddToWishlist = (): void => {
        if (added && wishlistItemId) {
            // remove
            removeToWishlist();
        } else {
            // add
            addToWishlist();
        }
    };

    return (
        <>
            {isIcon ? (
                <Button
                    onClick={handleAddToWishlist}
                    radius="full"
                    size="md"
                    className="w-[30px] h-[30px] px-0 min-w-0 bg-transparent"
                    variant="flat"
                >
                    {added ? <GoHeartFill className="text-lg text-danger" /> : <GoHeart className="text-lg" />}
                </Button>
            ) : (
                <Button
                    onClick={handleAddToWishlist}
                    className="bg-transparent"
                    radius="full"
                    variant="flat"
                    startContent={
                        added ? <GoHeartFill className="text-lg text-danger" /> : <GoHeart className="text-lg" />
                    }
                >
                    Yêu thích
                </Button>
            )}
        </>
    );
}
