import AddToCartForm from "@/components/Cart/AddToCartForm";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import { fetchData, formatVNCurrency } from "@/lib/utils";
import { IProduct, IProductSize, IProductTopping } from "@/types/product";
import { Avatar, Button, Chip, Image, Progress, User } from "@nextui-org/react";
import { Metadata, ResolvingMetadata } from "next";
import { GoHeart, GoHeartFill, GoShare } from "react-icons/go";
import { BiSolidStar, BiStar, BiSolidStarHalf } from "react-icons/bi";
import React from "react";
import Link from "next/link";
import emptyProduct from "@/assets/images/empty-product.png";
import ProductDetailActions from "@/components/Product/ProductDetailActions";

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/",
    },
    {
        content: "Menu",
        href: "/product",
    },
    {
        content: "Trà long hạt sen",
        href: "/product/:id",
    },
];

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const id = params.id;

    // fetch data
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`);

    const productData = await response.json();
    const product: IProduct = productData.data;

    // Adding product name to breadcumbs
    const lastBreadcumbItem = breadcumbItems[breadcumbItems.length - 1];

    // Edit the content of the last item
    lastBreadcumbItem.content = product?.name;
    lastBreadcumbItem.href = "/product/" + product?.id;

    return {
        title: product?.name,
    };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const productData = await fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${params.id}`);

    const product: IProduct = productData.data;

    if (!product) {
        return (
            <div className="container pb-10">
                <div className="px-6">
                    <div className="flex items-center justify-center flex-col">
                        <Image className="w-full" src={emptyProduct.src} alt="empty product" />
                        <p className="mt-5 text-gray-500 text-lg">Không tìm thấy sản phẩm</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container pb-10">
            <div className="px-6">
                <div className="mb-5">
                    <Breadcrumbs breadcumbItems={breadcumbItems} />
                </div>

                <div className="grid grid-cols-12 gap-10">
                    <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                        <div>
                            <Image className="w-full h-auto mb-5" src={product?.image} alt="" />
                            {product?.id && <ProductDetailActions productId={product.id} />}
                        </div>
                    </section>
                    <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                        <div>
                            <h1 className="font-bold text-3xl">{product?.name}</h1>
                            <p className="text-primary text-xl mt-3">{formatVNCurrency(product?.price)}</p>
                            <p className="mt-3 text-gray-500">{product?.description}</p>

                            <div className="mt-4">
                                <AddToCartForm product={product} />
                            </div>
                        </div>
                    </section>
                </div>

                <div className="grid grid-cols-12 gap-10 mt-14">
                    <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                        <div className="p-5 rounded-xl border">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-bold text-2xl ">Xếp hạng đánh giá</h3>
                                <Link className="text-[#0071e3]" href="">
                                    2 đánh giá
                                </Link>
                            </div>
                            <div className="mb-5">
                                <h4 className="flex items-center font-bold text-primary text-lg">
                                    <span className="text-[#ff9f00] me-2">4.4</span>
                                    <BiSolidStar className="text-[#ff9f00]" />
                                </h4>
                            </div>
                            <ul>
                                <li className="flex items-center justify-between mb-2">
                                    <div className="flex-1 flex items-center">
                                        <BiSolidStar className="text-default" />

                                        <span className="ms-1.5 me-3">5</span>

                                        <Progress
                                            // color="default"
                                            aria-label="Loading..."
                                            value={60}
                                            size="sm"
                                            className="max-w-sm"
                                            classNames={{
                                                track: "h-2",
                                                indicator: "bg-[#ff9f00]",
                                            }}
                                        />
                                    </div>
                                    <span className="text-black/55">3</span>
                                </li>
                                <li className="flex items-center justify-between mb-2">
                                    <div className="flex-1 flex items-center">
                                        <BiSolidStar className="text-default" />

                                        <span className="ms-1.5 me-3">4</span>

                                        <Progress
                                            // color="default"
                                            aria-label="Loading..."
                                            value={10}
                                            size="sm"
                                            className="max-w-sm"
                                            classNames={{
                                                track: "h-2",
                                                indicator: "bg-[#ff9f00]",
                                            }}
                                        />
                                    </div>
                                    <span className="text-black/55">3</span>
                                </li>
                                <li className="flex items-center justify-between mb-2">
                                    <div className="flex-1 flex items-center">
                                        <BiSolidStar className="text-default" />

                                        <span className="ms-1.5 me-3">3</span>

                                        <Progress
                                            // color="default"
                                            aria-label="Loading..."
                                            value={20}
                                            size="sm"
                                            className="max-w-sm"
                                            classNames={{
                                                track: "h-2",
                                                indicator: "bg-[#ff9f00]",
                                            }}
                                        />
                                    </div>
                                    <span className="text-black/55">3</span>
                                </li>
                                <li className="flex items-center mb-2">
                                    <div className="flex-1 flex items-center me-3">
                                        <BiSolidStar className="text-default" />

                                        <span className="ms-1.5 me-3">2</span>

                                        <Progress
                                            // color="default"
                                            aria-label="Loading..."
                                            value={0}
                                            size="sm"
                                            className="max-w-sm"
                                            classNames={{
                                                track: "h-2",
                                                indicator: "bg-[#ff9f00]",
                                            }}
                                        />
                                    </div>
                                    <span className="text-black/55">3</span>
                                </li>
                                <li className="flex items-center justify-between mb-2">
                                    <div className="flex-1 flex items-center">
                                        <BiSolidStar className="text-default" />

                                        <span className="ms-1.5 me-3">1</span>

                                        <Progress
                                            // color="default"
                                            aria-label="Loading..."
                                            value={0}
                                            size="sm"
                                            className="max-w-sm"
                                            classNames={{
                                                track: "h-2",
                                                indicator: "bg-[#ff9f00]",
                                            }}
                                        />
                                    </div>
                                    <span className="text-black/55">3</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                        <div>
                            <div>
                                <h3 className="font-bold text-2xl mb-5">Các đánh giá</h3>
                                <ul>
                                    <li className="flex">
                                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                                        <div className="ms-2 flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-medium">Vinbuddy</h3>
                                                <p className="text-sm text-black/50">2024-01-19 16:43</p>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-x-1 mt-1">
                                                    <BiSolidStar className="text-[#ff9f00]" />
                                                    <BiSolidStar className="text-[#ff9f00]" />
                                                    <BiSolidStar className="text-[#ff9f00]" />
                                                    <BiSolidStar className="text-[#ff9f00]" />
                                                    <BiSolidStar className="text-[#ff9f00]" />
                                                </div>
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <p className="text-sm text-black/50">Phân loại hàng: &nbsp;</p>
                                                <div className="flex items-center gap-x-2">
                                                    <Chip size="sm" variant="flat">
                                                        Bạc sỉu
                                                    </Chip>
                                                    <Chip size="sm" variant="flat">
                                                        Bạc sỉu
                                                    </Chip>
                                                </div>
                                            </div>
                                            <p className="text-sm mt-2">
                                                Bàn phím nhựa mà cầm nặng tay lắm ạ. Bàn full mod sw lube sẵn gõ siu êm,
                                                stock khá đầm tay, đã hơn bàn 2tr8 mình mua năm ngoái nữa, phải chi bik
                                                hãng này sớm hơn
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
