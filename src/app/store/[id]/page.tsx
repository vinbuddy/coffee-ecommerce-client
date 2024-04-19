import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import { Image } from "@nextui-org/react";

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

export default function StoreDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <div className="container pb-10">
            <div className="px-6">
                <div className="mb-5">
                    <Breadcrumbs breadcumbItems={breadcumbItems} />
                </div>

                <div className="grid grid-cols-12 gap-10">
                    <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                        <div>
                            <Image
                                radius="none"
                                className="w-full h-auto"
                                src="https://file.hstatic.net/1000075078/file/hcm-lu-gia1__1__e0a622da07ab48b8bb7a542f088b7233.jpg"
                                alt=""
                            />
                        </div>
                        <div className="mt-5 rounded-xl">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15680.18838856808!2d106.723697!3d10.730851!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175250bade920cd%3A0x1c3d86778eb23b46!2sThe%20Coffee%20House!5e0!3m2!1svi!2sus!4v1713535975825!5m2!1svi!2sus"
                                width="600"
                                height="450"
                                style={{ border: "none", overflow: "hidden" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </section>
                    <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                        <div>
                            <h1 className="font-bold text-primary text-3xl">
                                HCM Lữ Gia
                            </h1>
                            <p className="text-lg mt-3">
                                64A Lữ Gia, Phường 15, Quận 11, Hồ Chí Minh
                            </p>
                            <p className="mt-3 text-gray-500">7:00 - 22:00</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
