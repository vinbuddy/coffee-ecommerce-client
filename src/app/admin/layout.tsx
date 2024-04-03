"use client";
import {
    Avatar,
    Button,
    Divider,
    Image,
    Tooltip,
    User,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import logo from "@/assets/images/logo.png";

import { TbPackage } from "react-icons/tb";
import { FiShoppingBag } from "react-icons/fi";
import { RiHome5Line } from "react-icons/ri";
import { PiChartLineBold } from "react-icons/pi";
import { LuBadgePercent, LuBell, LuMapPin } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

const navLinks = [
    {
        content: "Trang chủ",
        href: "/admin",
        icon: <RiHome5Line />,
    },
    {
        content: "Đơn hàng",
        href: "/admin/order",
        icon: <TbPackage />,
    },
    {
        content: "Sản phẩm",
        href: "/admin/product",
        icon: <FiShoppingBag />,
    },
    {
        content: "Voucher",
        href: "/admin/voucher",
        icon: <LuBadgePercent />,
    },
    {
        content: "Doanh thu",
        href: "/admin/revenue",
        icon: <PiChartLineBold />,
    },
    {
        content: "Cửa hàng",
        href: "/admin/store",
        icon: <LuMapPin />,
    },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}): React.ReactNode {
    const pathName = usePathname();
    const admin = true;
    return (
        <div className="min-h-[400px]">
            <div className="grid grid-cols-12 gap-5 h-full">
                <section className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-2 2xl:col-span-2">
                    <aside className="h-screen flex flex-col justify-between sticky top-0 z-[1] p-5">
                        <div>
                            <Image
                                className="w-full"
                                src={logo.src}
                                alt="logo"
                                radius="none"
                            />
                            <ul className="mt-5">
                                {navLinks.map((navLink, index) => {
                                    let isActive: boolean =
                                        navLink.href === pathName;
                                    return (
                                        <li
                                            key={index}
                                            className={`${
                                                isActive &&
                                                "bg-[#E4E4E7] shadow"
                                            } rounded-lg  mb-3`}
                                        >
                                            <Link
                                                className="flex items-center px-3 py-3"
                                                href={navLink.href}
                                            >
                                                {navLink.icon}
                                                <span className="ms-2.5">
                                                    {navLink.content}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="p-3 rounded-lg bg-gray-100">
                            <Tooltip
                                showArrow
                                color="foreground"
                                placement="right"
                                delay={750}
                                content="Chi nhánh Thảo Điền quận 2, Thành phố Hồ Chí Minh"
                            >
                                <div className="flex items-center mb-3 cursor-pointer">
                                    <LuMapPin className="text-[#a1a1aa]" />
                                    <p className="text-[#a1a1aa] text-sm truncate ms-2">
                                        Cửa hàng Thảo Điền quận 2
                                    </p>
                                </div>
                            </Tooltip>

                            <Button
                                size="sm"
                                color="default"
                                variant="flat"
                                fullWidth
                                startContent={<LuBell />}
                            >
                                Thông báo
                            </Button>

                            <Divider className="my-4" />

                            <Button
                                size="sm"
                                color="danger"
                                variant="flat"
                                fullWidth
                                startContent={<IoLogOutOutline />}
                            >
                                Đăng xuất
                            </Button>
                        </div>
                    </aside>
                </section>
                <section className="col-span-6 sm:col-span-6 md:col-span-9 lg:col-span-9 xl:col-span-10 2xl:col-span-10">
                    <div className="p-5">{children}</div>
                </section>
            </div>
        </div>
    );
}
