import { Input } from "@nextui-org/react";
import React from "react";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import { CiSearch } from "react-icons/ci";
import ProductCard from "@/components/Product/ProductCard";
import Link from "next/link";

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

export default async function ProductPage() {
    // const res = await fetch("http://localhost:5500/product", { method: "GET" });
    // const data = await res.json();
    // console.log("data: ", data);

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
                            <Input
                                classNames={{
                                    base: "max-w-full h-10 !w-full",
                                    mainWrapper: "h-full",
                                    input: "text-small",
                                    inputWrapper:
                                        "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                }}
                                placeholder="Tìm sản phẩm..."
                                size="sm"
                                endContent={
                                    <button>
                                        <CiSearch size={18} />
                                    </button>
                                }
                                type="search"
                            />
                            <ul className="py-3">
                                <li className="px-3 py-2 rounded-lg text-primary">
                                    <Link href="/">Tất cả</Link>
                                </li>
                                <li className="px-3 py-2 rounded-lg ">
                                    <Link href="/">Cà phê</Link>
                                </li>
                                <li className="px-3 py-2 rounded-lg ">
                                    <Link href="/">Trà</Link>
                                </li>
                            </ul>
                        </aside>
                    </section>

                    {/* Products */}
                    <section className="col-span-6 sm:col-span-6 md:col-span-9 lg:col-span-9 xl:col-span-9 2xl:col-span-9">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="flex flex-col col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
