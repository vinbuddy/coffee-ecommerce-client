import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import AddToCartPreviewButton from "../Cart/AddToCartPreviewButton";
import { IProduct } from "@/types/product";
import { formatVNCurrency } from "@/lib/utils";
import { IWishList } from "@/types/wishlist";
import AddToWishlistButton from "./AddToWishlistButton";

interface IProps {
    wishlistItem: IWishList;
}

export default function WishlistCard({ wishlistItem }: IProps): React.ReactNode {
    return (
        <Card className="" shadow="none">
            <CardBody className="overflow-visible p-0">
                <Link href={`/product/${wishlistItem?.product_id}`}>
                    <Image
                        shadow="none"
                        radius="lg"
                        width="100%"
                        alt=""
                        className="w-full object-cover h-auto"
                        src={wishlistItem?.product_image}
                    />
                </Link>
            </CardBody>
            <CardFooter className="text-small justify-between py-4 px-0">
                <div className="flex flex-col w-[80%]">
                    <b className="text-medium truncate max-w-[90%]">{wishlistItem?.product_name}</b>
                    <p className="text-default-500">{formatVNCurrency(wishlistItem?.product_price)}</p>
                </div>
                <div className="flex justify-end">
                    <AddToWishlistButton
                        isIcon={true}
                        isAdded
                        productId={wishlistItem?.product_id}
                        wishlistItemId={wishlistItem?.id}
                    />
                </div>
            </CardFooter>
        </Card>
    );
}
