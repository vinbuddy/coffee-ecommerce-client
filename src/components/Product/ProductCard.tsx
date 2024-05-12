import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from "@nextui-org/react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import AddToCartPreviewButton from "../Cart/AddToCartPreviewButton";
import { IProduct } from "@/types/product";
import { formatVNCurrency } from "@/lib/utils";
import { AiOutlineStop } from "react-icons/ai";

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
            <CardFooter className="text-small justify-between py-4 px-0">
                <div className="flex flex-col w-[80%]">
                    <b className="text-medium truncate max-w-[90%]">{product?.name}</b>
                    <p className="text-default-500">{formatVNCurrency(product?.price)}</p>
                </div>
                <div className="w-[20%] flex justify-end">
                    <AddToCartPreviewButton
                        product={product}
                        buttonProps={{
                            color: "primary",
                            size: "md",
                            radius: "full",
                            className: "w-[30px] h-[30px] px-0 min-w-0",
                            children: <AiOutlinePlus className="text-lg" />,
                        }}
                    />
                </div>
            </CardFooter>
        </Card>
    );
}
