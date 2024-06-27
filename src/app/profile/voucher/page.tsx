"use client";
import VoucherItem from "@/components/Voucher/VoucherItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import { fetchData } from "@/lib/utils";
import { IVoucher } from "@/types/voucher";
import { Image } from "@nextui-org/react";
import emptyVoucher from "@/assets/images/empty-search.png";
import useSWR from "swr";
import { useEffect } from "react";

export default function VoucherPage() {
    const { currentUser } = useCurrentUser();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/voucher/user/${currentUser?.id}`;
    const { data: voucherData, isLoading, error } = useSWR(url);

    const vouchers: IVoucher[] = voucherData?.data || [];

    useEffect(() => {
        document.title = "Khuyến mãi";
    }, []);

    return (
        <div className="">
            <div className="h-full pb-5">
                <h1 className="text-xl font-bold mb-5">Các khuyến mãi</h1>

                {!isLoading && vouchers.length === 0 && (
                    <div className="flex items-center justify-center flex-col">
                        <Image removeWrapper className="w-1/2" src={emptyVoucher.src} alt="empty product" />
                        <p className="mt-5 text-gray-500 text-lg">Bạn chưa có khuyến mãi</p>
                    </div>
                )}

                <div className="grid grid-cols-12 h-full gap-5">
                    {vouchers.length > 0 &&
                        vouchers.map((voucher) => (
                            <section
                                key={voucher.id}
                                className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6"
                            >
                                <div>
                                    <VoucherItem voucher={voucher} />
                                </div>
                            </section>
                        ))}
                </div>
            </div>
        </div>
    );
}
