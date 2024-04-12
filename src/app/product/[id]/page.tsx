import AddToCartForm from "@/components/Cart/AddToCartForm";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import { fetchData, formatVNCurrency } from "@/lib/utils";
import { IProduct, IProductSize, IProductTopping } from "@/types/product";
import { Image } from "@nextui-org/react";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

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

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id;

    // fetch data
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`
    );

    const productData = await response.json();
    const product: IProduct = productData.data;

    // Adding product name to breadcumbs
    const lastBreadcumbItem = breadcumbItems[breadcumbItems.length - 1];

    // Edit the content of the last item
    lastBreadcumbItem.content = product.name;
    lastBreadcumbItem.href = "/product/" + product.id;

    return {
        title: product.name,
    };
}

export default async function ProductDetail({
    params,
}: {
    params: { id: string };
}) {
    const [productData, productToppingData, productSizeData] =
        await Promise.all([
            fetchData(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${params.id}`
            ),
            fetchData(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/product-toppings/${params.id}`
            ),
            fetchData(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/product-sizes/${params.id}`
            ),
        ]);

    const product: IProduct = productData.data;
    const productToppings: IProductTopping[] = productToppingData.data;
    const productSizes: IProductSize[] = productSizeData.data;
    return (
        <div className="container pb-10">
            <div className="px-6">
                <div className="mb-5">
                    <Breadcrumbs breadcumbItems={breadcumbItems} />
                </div>

                <div className="grid grid-cols-12 gap-5">
                    <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                        <div>
                            <Image
                                className="w-full h-auto"
                                src="https://product.hstatic.net/1000075078/product/1649378747_tra-sen-nhan_441ab034e29e4858813ebff91f85162d.jpg"
                                alt=""
                            />
                        </div>
                    </section>
                    <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                        <div>
                            <h1 className="font-bold text-3xl">
                                {product.name}
                            </h1>
                            <p className="text-primary text-xl mt-3">
                                {formatVNCurrency(product.price)}
                            </p>
                            <p className="mt-3 text-gray-500">
                                {product.description}
                            </p>

                            <div className="mt-7">
                                <AddToCartForm product={product} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
