import AddToCartForm from "@/components/Cart/AddToCartForm";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import { Image } from "@nextui-org/react";
import React from "react";

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
        href: "/product",
    },
];

export default function ProductDetail({
    params,
}: {
    params: { id: string };
}): React.ReactNode {
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
                                Trà Long Nhãn Hạt Sen
                            </h1>
                            <p className="text-primary text-xl mt-3">
                                39.000 đ
                            </p>
                            <p className="mt-3 text-gray-500">
                                Thức uống mang hương vị của nhãn, của sen, của
                                trà Oolong đầy thanh mát cho tất cả các thành
                                viên trong dịp Tết này. An lành, thư thái và đậm
                                đà chính là những gì The Coffee House mong muốn
                                gửi trao đến bạn và gia đình.
                            </p>

                            <div className="mt-7">
                                <AddToCartForm />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
