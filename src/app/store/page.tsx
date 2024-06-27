import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import { fetchData } from "@/lib/utils";
import { IStore, IStoreLocation } from "@/types/store";
import { Button, Image, Link as NextUILink } from "@nextui-org/react";
import Link from "next/link";

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/",
    },
    {
        content: "Cửa hàng",
        href: "/store",
    },
];

const DEFAULT_CITY = "Thành phố Hồ Chí Minh";

interface IProps {}

export default async function StorePage({ searchParams }: { searchParams: { city: string } }) {
    const currentLocation = searchParams.city ?? DEFAULT_CITY;

    const storeFetchURL = searchParams?.city
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/store?city=${searchParams.city}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/store?city=${DEFAULT_CITY}`;
    const cityStoreFetchURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/store/location`;

    const [storeData, storeLocationData] = await Promise.all([fetchData(storeFetchURL), fetchData(cityStoreFetchURL)]);

    const stores: IStore[] = storeData.data;
    const storeLocations: IStoreLocation[] = storeLocationData.data;

    return (
        <div className="container pb-10 min-h-[400px]">
            <div className="px-6 h-full">
                <div className="mb-5">
                    <Breadcrumbs breadcumbItems={breadcumbItems} />
                </div>

                <div className="grid grid-cols-12 h-full gap-5">
                    {/* Filter sidebar */}
                    <section className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                        <aside
                            style={{ height: "calc(100vh - 100px)" }}
                            className="!h-auto sm:!h-auto md:!h-auto sticky top-[80px] z-[1] overflow-y-auto scrollbar"
                        >
                            <ul className="">
                                {storeLocations.map((storeLocation) => {
                                    let isActive =
                                        storeLocation.city.toLocaleLowerCase().trim() ===
                                        currentLocation.toLocaleLowerCase().trim();

                                    return (
                                        <li
                                            key={storeLocation.city}
                                            className={`px-3 py-2 rounded-lg ${isActive && "text-primary"}`}
                                        >
                                            <Link href={`/store?city=${storeLocation.city}`} replace={true}>
                                                {storeLocation.city}&nbsp;(
                                                {storeLocation.store_count})
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </aside>
                    </section>

                    {/* Stores */}
                    <section className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-9 xl:col-span-9 2xl:col-span-9">
                        <div className="grid grid-cols-12 gap-x-5 gap-y-10">
                            {stores.map((store) => (
                                <div
                                    key={store.id}
                                    className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6"
                                >
                                    <Link className="block" href={`/store/${store.id}`}>
                                        <Image
                                            src={store.image || ""}
                                            alt="store thumbnail"
                                            className="h-[300px] !w-full object-cover"
                                        />
                                        <h3 className="font-bold mt-2 text-lg">{store.store_name}</h3>

                                        <div className="my-2">
                                            <p className="mb-1 text-sm">{store.address}</p>
                                            <p className="text-sm">
                                                {store.open_time} - {store.close_time}
                                            </p>
                                        </div>
                                    </Link>
                                    <Button color="primary" fullWidth size="sm" variant="flat">
                                        <NextUILink
                                            isExternal
                                            className="text-primary text-sm block w-full"
                                            href={store.google_map_location}
                                        >
                                            Xem trên bản đồ
                                        </NextUILink>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
