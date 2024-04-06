import type { Metadata, ResolvingMetadata } from "next";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import { IProduct, IProductSize, IProductTopping } from "@/types/product";
import { Chip, Image } from "@nextui-org/react";
import { fetchData, formatVNCurrency } from "@/lib/utils";

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/admin",
    },
    {
        content: "Sản phẩm",
        href: "/admin/product",
    },
    {
        content: "Chi tiết sản phẩm",
        href: "/admin/product/",
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

    return {
        title: product.name,
    };
}

export default async function AdminProductDetailPage({
    params,
}: {
    params: { id: string };
}) {
    let [productData, productToppingData, productSizeData] = await Promise.all([
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
        <div>
            <div className="mb-7">
                <Breadcrumbs breadcumbItems={breadcumbItems} />
            </div>

            <div className="grid grid-cols-12 gap-5">
                <section className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-7 xl:col-span-7 2xl:col-span-7">
                    <div>
                        <h1 className="font-bold text-3xl">
                            {product?.name || "Unknown name"}
                        </h1>

                        <p className="text-primary text-xl mt-3">
                            {formatVNCurrency(product?.price) ||
                                "Unknown price"}
                        </p>
                        <Chip className="mt-3" color="default" variant="dot">
                            {product?.category_name || "Unknown category"}
                        </Chip>
                        <p className="mt-3 text-gray-500">
                            {product?.description || "Unknown description"}
                        </p>

                        <div className="mt-5 border-t py-5">
                            {productSizes.length > 0 && (
                                <div className="mb-5">
                                    <h3 className="text-default-500 mb-3">
                                        Size của sản phẩm
                                    </h3>
                                    <div className="flex gap-3">
                                        {productSizes.map((size) => (
                                            <Chip variant="flat" key={size.id}>
                                                {size.size_name} +&nbsp;
                                                {formatVNCurrency(
                                                    size.size_price
                                                )}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {productToppings.length > 0 && (
                                <div>
                                    <h3 className="text-default-500 mb-3">
                                        Topping của sản phẩm
                                    </h3>
                                    <div className="flex gap-3">
                                        {productToppings.map((topping) => (
                                            <Chip
                                                variant="flat"
                                                key={topping.id}
                                            >
                                                {topping.topping_name} +&nbsp;
                                                {formatVNCurrency(
                                                    topping.topping_price
                                                )}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <section className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-5 2xl:col-span-5">
                    <div>
                        <Image
                            className="w-full h-auto"
                            src={product?.image || ""}
                            alt=""
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
