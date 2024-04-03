"use client";
import React from "react";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import Link from "next/link";
import { User } from "@nextui-org/react";
import { BiUser, BiPackage } from "react-icons/bi";
import { RiCoupon3Line } from "react-icons/ri";
import useCurrentUser from "@/hooks/useCurrentUser";
import MainLayout from "@/components/UI/MainLayout";
import { usePathname } from "next/navigation";

const navLinks = [
    {
        content: "Trang cá nhân",
        href: "/profile",
        icon: <BiUser />,
    },
    {
        content: "Đơn hàng",
        href: "/profile/order",
        icon: <BiPackage />,
    },
    {
        content: "Khuyến mãi",
        href: "/voucher",
        icon: <RiCoupon3Line />,
    },
];

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { currentUser } = useCurrentUser();
    const pathName = usePathname();

    return (
        <MainLayout>
            <div className="container pb-10 min-h-[400px]">
                <div className="px-6 h-full">
                    <div className="grid grid-cols-12 h-full gap-10">
                        {/* Filter sidebar */}
                        <section className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                            <aside className="sticky top-[80px] z-[1]">
                                <div className="pb-3">
                                    <User
                                        name={currentUser?.user_name}
                                        description="Khách hàng mới"
                                        avatarProps={{
                                            src: currentUser?.avatar || "",
                                        }}
                                    />
                                </div>
                                <ul className="py-3 border-t border-dashed">
                                    {navLinks.map((navLink, index) => (
                                        <li
                                            key={index}
                                            className={`flex items-center py-2 rounded-lg ${
                                                navLink.href === pathName &&
                                                "text-primary"
                                            }`}
                                        >
                                            <span className="me-3">
                                                {navLink.icon}
                                            </span>
                                            <Link href={navLink.href}>
                                                {navLink.content}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                        </section>

                        {/* Products */}
                        <section className="col-span-6 sm:col-span-6 md:col-span-9 lg:col-span-9 xl:col-span-9 2xl:col-span-9">
                            {children}
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
