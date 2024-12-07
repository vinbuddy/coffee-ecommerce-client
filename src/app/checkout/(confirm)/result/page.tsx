import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

import { formatDateTime } from "@/lib/utils";
import { BiSolidCheckCircle } from "react-icons/bi";

export default function ResultPage({
    searchParams,
}: {
    searchParams: { orderId: string; orderDate: string };
}): React.ReactNode {
    return (
        <div className="container pb-10 min-h-[350px]">
            <div className="px-6 h-full">
                <div className="flex items-center justify-center h-full">
                    <div className="flex items-center sm:justify-center">
                        <div className="w-full p-4 border shadow rounded-2xl">
                            <header className="sm:text-center">
                                <div className="flex sm:justify-center">
                                    <BiSolidCheckCircle className="text-primary text-5xl" />
                                </div>
                                <h5 className="mt-2 text-2xl font-bold">Cảm ơn vì đơn hàng của bạn</h5>
                            </header>

                            <div className="my-2 pb-4">
                                <p className="text-desc my-4 sm:text-center">
                                    Đơn hàng của bạn đang chờ xác nhận và sẽ được giao sớm đến bạn
                                </p>
                                <div className="mt-3 flex flex-col sm:items-center">
                                    <p className="w-fit px-4 py-2 bg-[#eee] rounded-xl">
                                        Mã đơn hàng #{searchParams?.orderId || ""}
                                    </p>

                                    <p className="w-fit mt-2 px-3 py-2 text-black/70 rounded-full">
                                        Ngày đặt: <span>{formatDateTime(searchParams?.orderDate) || ""}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center sm:justify-end border-t-2 border-dashed pt-4">
                                <Button
                                    as={Link}
                                    href="/"
                                    radius="full"
                                    className="bg-transparent text-black border-none sm:w-auto w-full"
                                >
                                    Trang chủ
                                </Button>
                                <Button
                                    as={Link}
                                    href="/profile/order"
                                    color="primary"
                                    radius="full"
                                    className="sm:w-auto w-full"
                                >
                                    Theo dõi đơn hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
