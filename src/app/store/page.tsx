"use client";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import {
    Button,
    Image,
    Link as NextUILink,
    Select,
    SelectItem,
} from "@nextui-org/react";
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

const districts = ["Quận 3", "Quận 2"];

interface IProps {}

export default function StorePage() {
    return (
        <div className="container pb-10 min-h-[400px]">
            <div className="px-6 h-full">
                <div className="mb-5">
                    <Breadcrumbs breadcumbItems={breadcumbItems} />
                </div>

                <div className="grid grid-cols-12 h-full gap-5">
                    {/* Filter sidebar */}
                    <section className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                        <aside
                            style={{ height: "calc(100vh - 100px)" }}
                            className="sticky top-[80px] z-[1] overflow-y-auto scrollbar"
                        >
                            <ul className="">
                                <li className="px-3 py-2 rounded-lg text-primary">
                                    Tp Hồ Chí Minh (63)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Hà Nội (37)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Đà Nãng (5)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Hà Nội (37)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Đà Nãng (5)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Hà Nội (37)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Đà Nãng (5)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Hà Nội (37)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Đà Nãng (5)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Hà Nội (37)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Đà Nãng (5)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Hà Nội (37)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Đà Nãng (5)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Hà Nội (37)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Đà Nãng (5)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Hà Nội (37)
                                </li>
                                <li className="px-3 py-2 rounded-lg">
                                    Đà Nãng (5)
                                </li>
                            </ul>
                        </aside>
                    </section>

                    {/* Stores */}
                    <section className="col-span-6 sm:col-span-6 md:col-span-9 lg:col-span-9 xl:col-span-9 2xl:col-span-9">
                        <div className="mb-10">
                            <Select
                                placeholder="Chọn quận, huyện"
                                className="max-w-xs"
                                size="md"
                            >
                                {districts.map((district) => (
                                    <SelectItem key={district} value={district}>
                                        {district}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className="grid grid-cols-12 gap-x-5 gap-y-10">
                            <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                                <Link href="/store/1">
                                    <Image
                                        isZoomed
                                        radius="lg"
                                        src="https://file.hstatic.net/1000075078/file/hcm-lu-gia1__1__e0a622da07ab48b8bb7a542f088b7233.jpg"
                                        alt="store thumbnail"
                                    />
                                    <h3 className="font-bold mt-2 text-lg">
                                        HCM Lữ Gia
                                    </h3>

                                    <div className="my-2">
                                        <p className="mb-1 text-sm">
                                            64A Lữ Gia, Phường 15, Quận 11, Hồ
                                            Chí Minh
                                        </p>
                                        <p className="text-sm">07:30 - 22:00</p>
                                    </div>

                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="sm"
                                        variant="flat"
                                    >
                                        <NextUILink
                                            isExternal
                                            className="text-primary text-sm"
                                            href=""
                                        >
                                            Xem trên bản đồ
                                        </NextUILink>
                                    </Button>
                                </Link>
                            </div>
                            <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                                <Link href="">
                                    <Image
                                        isZoomed
                                        radius="lg"
                                        src="https://file.hstatic.net/1000075078/file/hcm-lu-gia1__1__e0a622da07ab48b8bb7a542f088b7233.jpg"
                                        alt="store thumbnail"
                                    />
                                    <h3 className="font-bold mt-2 text-lg">
                                        HCM Lữ Gia
                                    </h3>

                                    <div className="my-2">
                                        <p className="mb-1 text-sm">
                                            64A Lữ Gia, Phường 15, Quận 11, Hồ
                                            Chí Minh
                                        </p>
                                        <p className="text-sm">07:30 - 22:00</p>
                                    </div>

                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="sm"
                                        variant="flat"
                                    >
                                        <NextUILink
                                            isExternal
                                            className="text-primary text-sm"
                                            href=""
                                        >
                                            Xem trên bản đồ
                                        </NextUILink>
                                    </Button>
                                </Link>
                            </div>
                            <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                                <Link href="">
                                    <Image
                                        isZoomed
                                        radius="lg"
                                        src="https://file.hstatic.net/1000075078/file/hcm-lu-gia1__1__e0a622da07ab48b8bb7a542f088b7233.jpg"
                                        alt="store thumbnail"
                                    />
                                    <h3 className="font-bold mt-2 text-lg">
                                        HCM Lữ Gia
                                    </h3>

                                    <div className="my-2">
                                        <p className="mb-1 text-sm">
                                            64A Lữ Gia, Phường 15, Quận 11, Hồ
                                            Chí Minh
                                        </p>
                                        <p className="text-sm">07:30 - 22:00</p>
                                    </div>

                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="sm"
                                        variant="flat"
                                    >
                                        <NextUILink
                                            isExternal
                                            className="text-primary text-sm"
                                            href=""
                                        >
                                            Xem trên bản đồ
                                        </NextUILink>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
