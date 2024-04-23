import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import { fetchData } from "@/lib/utils";
import { IStore } from "@/types/store";
import { Image } from "@nextui-org/react";
import { Metadata, ResolvingMetadata } from "next";

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
        content: "Cửa hàng",
        href: "/store",
    },
    {
        content: "HCM Lữ Gia",
        href: "/store/:id",
    },
];

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const id = params.id;

    // fetch data
    const storeData = await fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/store/${id}`);

    const store: IStore = storeData.data;

    // Adding product name to breadcumbs
    const lastBreadcumbItem = breadcumbItems[breadcumbItems.length - 1];

    // Edit the content of the last item
    lastBreadcumbItem.content = store?.store_name;
    lastBreadcumbItem.href = "/store/" + store?.id;

    return {
        title: store?.store_name,
    };
}

export default async function StoreDetailPage({ params }: { params: { id: string } }) {
    const resData = await fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/store/${params.id}`);
    const store: IStore = resData.data;
    return (
        <div className="container pb-10">
            <div className="px-6">
                <div className="mb-5">
                    <Breadcrumbs breadcumbItems={breadcumbItems} />
                </div>

                <div className="grid grid-cols-12 gap-10">
                    <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                        <div>
                            <Image radius="lg" className="w-full h-auto" src={store.image} alt="" />
                        </div>
                    </section>
                    <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                        <div>
                            <h1 className="font-bold text-primary text-3xl">{store.store_name}</h1>
                            <p className="text-lg mt-3">{store.address}</p>
                            <p className="mt-3 text-gray-500">
                                {store.open_time} - {store.close_time}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
