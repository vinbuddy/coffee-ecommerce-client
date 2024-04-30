import VoucherItem from "@/components/Voucher/VoucherItem";

export default function VoucherPage() {
    return (
        <div className="container">
            <div className="px-6 h-full pb-5">
                <h1 className="text-xl font-bold mb-5">Các khuyến mãi</h1>
                <div className="grid grid-cols-12 h-full gap-5">
                    <section className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                        <div>
                            <VoucherItem />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
