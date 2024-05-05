"use client";
import VoucherItem from "@/components/Voucher/VoucherItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import { fetchData } from "@/lib/utils";
import { IVoucher } from "@/types/voucher";
import useSWR from "swr";

export default function VoucherPage() {
    const { currentUser } = useCurrentUser();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/voucher/user/${currentUser?.id}`;
    const { data: voucherData, isLoading, error } = useSWR(url);

    const vouchers: IVoucher[] = voucherData?.data || [];

    return (
        <div className="container">
            <div className="px-6 h-full pb-5">
                <h1 className="text-xl font-bold mb-5">Các khuyến mãi</h1>
                <div className="grid grid-cols-12 h-full gap-5">
                    {vouchers.length > 0 ? (
                        vouchers.map((voucher) => (
                            <section
                                key={voucher.id}
                                className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6"
                            >
                                <div>
                                    <VoucherItem voucher={voucher} />
                                </div>
                            </section>
                        ))
                    ) : (
                        <div className="flex items-center justify-center flex-col">
                            <p className="mt-1 text-gray-500 text-lg">Bạn chưa có khuyến mãi</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
