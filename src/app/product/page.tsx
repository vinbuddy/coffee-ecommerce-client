import { Image, Input } from "@nextui-org/react";
import React from "react";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import emptyProduct from "@/assets/images/empty-product.png";
import ProductCard from "@/components/Product/ProductCard";
import Link from "next/link";
import { IProduct } from "@/types/product";
import { fetchData } from "@/lib/utils";
import { ICategory } from "@/types/category";
import ProductSearchBar from "@/components/Product/ProductSearchBar";

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
        content: "Tất cả",
        href: "/product",
    },
];

export default async function ProductPage({ searchParams }: { searchParams: { name: string; category_id: number } }) {
    const productFetchURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product?category_id=${
        searchParams.category_id || 0
    }&name=${searchParams.name || ""}`;
    const categoryFetchURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`;

    let [productData, categoryData] = await Promise.all([fetchData(productFetchURL), fetchData(categoryFetchURL)]);

    const products: IProduct[] = productData.data;
    const categories: ICategory[] = categoryData.data;

    return (
        <div className="container pb-10 min-h-[400px]">
            <div className="px-6 h-full">
                <div className="mb-5">
                    <Breadcrumbs breadcumbItems={breadcumbItems} />
                </div>

                <div className="grid grid-cols-12 h-full gap-5">
                    {/* Filter sidebar */}
                    <section className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                        <aside className="sticky top-[80px] z-[1]">
                            <ProductSearchBar />
                            <ul className="py-3">
                                <li className={`px-3 py-2 rounded-lg ${!searchParams.category_id && "text-primary"}`}>
                                    <Link href="/product">Tất cả</Link>
                                </li>
                                {categories.map((category) => (
                                    <li
                                        key={category?.id}
                                        className={`px-3 py-2 rounded-lg ${
                                            category.id == searchParams.category_id && "text-primary"
                                        }`}
                                    >
                                        <Link replace={true} href={`/product?category_id=${category?.id}`}>
                                            {category?.category_name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </section>

                    {/* Products */}
                    <section className="col-span-6 sm:col-span-6 md:col-span-9 lg:col-span-9 xl:col-span-9 2xl:col-span-9">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-12 gap-5">
                                {products.map((product) => (
                                    <div
                                        key={product?.id}
                                        className="flex flex-col col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3"
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center flex-col">
                                <Image className="w-full" src={emptyProduct.src} alt="empty product" />
                                <p className="mt-5 text-gray-500 text-lg">Không tìm thấy sản phẩm</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
