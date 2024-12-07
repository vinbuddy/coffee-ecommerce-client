"use client";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import { GoShare } from "react-icons/go";
import useSWR from "swr";

import AddToWishlistButton from "@/components/Wishlist/AddToWishlistButton";
import { IWishList } from "@/types";
import { useCurrentUser } from "@/hooks";

interface IProps {
    productId: number;
}

export default function ProductDetailActions({ productId }: IProps) {
    const { currentUser } = useCurrentUser();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/${currentUser?.id}`;
    const { data: wishlistData, isLoading, error } = useSWR(url);
    const wishlist: IWishList[] = wishlistData?.data || [];

    const currentWishList = wishlist.find((item) => item?.product_id === productId);
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Đã sao chép link", { position: "bottom-center" });
    };

    if (isLoading) {
        return <div className="flex items-center gap-x-2"></div>;
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={handleCopyLink}
                radius="full"
                variant="flat"
                startContent={<GoShare className="text-lg" />}
            >
                Chia sẽ
            </Button>
            <AddToWishlistButton
                wishlistItemId={currentWishList?.id}
                productId={productId}
                isAdded={Boolean(currentWishList)}
            />
        </div>
    );
}
