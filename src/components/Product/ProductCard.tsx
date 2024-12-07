import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from "@nextui-org/react";
import Link from "next/link";
import { AiOutlineStop } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

import AddToCartPreviewButton from "../Cart/AddToCartPreviewButton";
import { formatVNCurrency } from "@/lib/utils";
import { IProduct } from "@/types";

interface IProps {
    product: IProduct;
}

export default function ProductCard({ product }: IProps): React.ReactNode {
    return (
        <Card shadow="none">
            {!product?.status && (
                <CardHeader className="absolute z-[11] top-1 right-1 flex-col !items-end">
                    <Chip className="px-2" startContent={<AiOutlineStop />} color="danger" variant="faded">
                        Hết
                    </Chip>
                </CardHeader>
            )}
            <CardBody className="overflow-visible p-0">
                <Link href={`/product/${product?.id}`}>
                    <Image
                        shadow="none"
                        radius="lg"
                        width="100%"
                        alt=""
                        className="w-full object-cover h-auto"
                        src={product?.image}
                    />
                </Link>
            </CardBody>
            <CardFooter className="text-small flex-col sm:flex-row justify-between py-4 px-0">
                <div className="flex flex-col w-full">
                    <b className="text-medium truncate max-w-[90%]">{product?.name}</b>
                    <p className="text-default-500">{formatVNCurrency(product?.price)}</p>
                </div>
                {/* Show on tablet, mobile */}
                <div className="hidden sm:flex w-[20%] justify-end">
                    <AddToCartPreviewButton
                        product={product}
                        buttonProps={{
                            color: "primary",
                            size: "md",
                            radius: "full",
                            className: "w-full sm:w-[30px] h-[30px] px-0 min-w-0",
                            children: <AiOutlinePlus className="text-lg" />,
                        }}
                    />
                </div>
                <div className="flex w-full mt-3 sm:hidden sm:mt-0 justify-end">
                    <AddToCartPreviewButton
                        product={product}
                        buttonProps={{
                            color: "primary",
                            variant: "shadow",
                            size: "md",
                            radius: "full",
                            className: "w-full sm:w-[30px] h-[30px] px-0 min-w-0",
                            children: <span className="text-tiny">Thêm vào giỏ hàng</span>,
                        }}
                    />
                </div>
            </CardFooter>
        </Card>
    );
}
