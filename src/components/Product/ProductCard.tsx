import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

export default function ProductCard(): React.ReactNode {
    return (
        <Card className=" shadow-lg" shadow="none">
            <Link href="">
                <CardBody className="overflow-visible p-4">
                    <Image
                        shadow="none"
                        radius="lg"
                        width="100%"
                        alt=""
                        className="w-full object-cover h-auto"
                        src="https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_a60e3f09ea424c40a029e5ab446e785f_large.png"
                    />
                </CardBody>
                <CardFooter className="text-small justify-between p-4 pt-0">
                    <div className="flex flex-col">
                        <b className="text-medium truncate">Hi-tea trà vải</b>
                        <p className="text-default-500">49.000 đ</p>
                    </div>
                    <Button
                        color="primary"
                        className="rounded-full w-[35px] h-[35px] px-0 min-w-0"
                    >
                        <AiOutlinePlus className="text-xl" />
                    </Button>
                </CardFooter>
            </Link>
        </Card>
    );
}
