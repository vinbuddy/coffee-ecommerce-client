import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import AddToCartPreviewButton from "../Cart/AddToCartPreviewButton";

export default function ProductCard(): React.ReactNode {
    return (
        <Card className="" shadow="none">
            <CardBody className="overflow-visible p-0">
                <Link href="/product/123">
                    <Image
                        shadow="none"
                        radius="lg"
                        width="100%"
                        alt=""
                        className="w-full object-cover h-auto"
                        src="https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_a60e3f09ea424c40a029e5ab446e785f_large.png"
                    />
                </Link>
            </CardBody>
            <CardFooter className="text-small justify-between py-4 px-0">
                <div className="flex flex-col">
                    <b className="text-medium truncate">Hi-tea trà vải</b>
                    <p className="text-default-500">49.000 đ</p>
                </div>
                {/* <Button
                    type="button"
                    as="button"
                    color="primary"
                    radius="full"
                    className="w-[35px] h-[35px] px-0 min-w-0"
                >
                    <AiOutlinePlus className="text-xl" />
                </Button> */}
                <AddToCartPreviewButton
                    buttonProps={{
                        color: "primary",
                        size: "md",
                        radius: "full",
                        className: "w-[30px] h-[30px] px-0 min-w-0",
                        children: <AiOutlinePlus className="text-lg" />,
                    }}
                />
            </CardFooter>
        </Card>
    );
}
