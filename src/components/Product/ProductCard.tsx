import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

export default function ProductCard(): React.ReactNode {
    return (
        <Card shadow="sm">
            <Link href="">
                <CardBody className="overflow-visible p-0">
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt=""
                        className="w-full object-cover h-auto"
                        src="https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_a60e3f09ea424c40a029e5ab446e785f_large.png"
                    />
                </CardBody>
                <CardFooter className="text-small justify-between py-4">
                    <b>Hi-tea trà vải</b>
                    <p className="text-default-500">49.000 đ</p>
                </CardFooter>
            </Link>
        </Card>
    );
}
