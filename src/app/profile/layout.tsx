"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@nextui-org/react";

import { TbBasketHeart } from "react-icons/tb";
import { BiUser, BiPackage } from "react-icons/bi";
import { RiCoupon3Line } from "react-icons/ri";
import { useCurrentUser } from "@/hooks";
import MainLayout from "@/components/UI/MainLayout";

const navLinks = [
    {
        content: "Trang cá nhân",
        href: "/profile",
        icon: <BiUser />,
    },
    {
        content: "Sản phẩm yêu thích",
        href: "/profile/wishlist",
        icon: <TbBasketHeart />,
    },
    {
        content: "Đơn hàng",
        href: "/profile/order",
        icon: <BiPackage />,
    },
    {
        content: "Khuyến mãi",
        href: "/profile/voucher",
        icon: <RiCoupon3Line />,
    },
];

export default function ProductLayout({ children }: { children: React.ReactNode }) {
    const { currentUser } = useCurrentUser();
    const pathName = usePathname();
    const router = useRouter();

    // Redirect to login page if user is not logged in
    useEffect(() => {
        console.log("currentUser", currentUser);

        // if (!currentUser) {
        //     router.push("/login");
        // }
    }, [currentUser]);

    return (
        <MainLayout>
            <div className="container pb-10 min-h-[400px]">
                <div className="px-6 h-full">
                    <div className="grid grid-cols-12 h-full gap-0 lg:gap-10">
                        {/* Filter sidebar */}
                        <section className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-3 xl:col-span-3 2xl:col-span-3 mb-5">
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
                                                navLink.href === pathName && "text-primary"
                                            }`}
                                        >
                                            <span className="me-3">{navLink.icon}</span>
                                            <Link href={navLink.href}>{navLink.content}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                        </section>

                        {/* Products */}
                        <section className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-9 xl:col-span-9 2xl:col-span-9">
                            {children}
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
