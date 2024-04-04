"use client";
import {
    Accordion,
    AccordionItem,
    Button,
    Divider,
    Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

import { TbPackage, TbCategoryPlus } from "react-icons/tb";
import { FiShoppingBag } from "react-icons/fi";
import { RiHome5Line } from "react-icons/ri";
import { PiChartLineBold } from "react-icons/pi";
import { LuBadgePercent, LuBell, LuMapPin, LuIceCream2 } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { RxSize } from "react-icons/rx";

import { usePathname } from "next/navigation";
import { INavLink } from "@/types";
import Logo from "@/components/UI/Logo";

const navLinks: INavLink[] = [
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
        children: [
            {
                content: "Sản phẩm",
                href: "/admin/product",
                icon: <FiShoppingBag />,
            },
            {
                content: "Danh mục",
                href: "/admin/category",
                icon: <TbCategoryPlus />,
            },
            {
                content: "Size",
                href: "/admin/size",
                icon: <RxSize />,
            },
            {
                content: "Topping",
                href: "/admin/topping",
                icon: <LuIceCream2 />,
            },
        ],
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

    const renderSubNavLink = (
        currentNav: INavLink,
        subNavs: INavLink[]
    ): React.ReactNode => {
        return (
            <Accordion
                variant="light"
                showDivider={false}
                itemClasses={{ trigger: "py-4", title: "text-base" }}
            >
                <AccordionItem
                    startContent={currentNav.icon}
                    title={currentNav.content}
                >
                    {subNavs.map((navLink, index) => {
                        let isActive: boolean = navLink.href === pathName;

                        return (
                            <li
                                key={index}
                                className={`${
                                    isActive && "bg-[#E4E4E7] shadow"
                                } rounded-lg  mb-3`}
                            >
                                <Link
                                    className="flex items-center ps-4 py-2"
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
                </AccordionItem>
            </Accordion>
        );
    };

    return (
        <div className="min-h-[400px]">
            <div className="grid grid-cols-12 gap-5 h-full">
                <section className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-2 2xl:col-span-2">
                    <aside className="h-screen flex flex-col justify-between sticky top-0 z-[1] p-5 overflow-y-auto scrollbar">
                        <div>
                            <Logo href="/admin" className="w-full" />
                            <ul className="mt-5">
                                {navLinks.map((navLink, index) => {
                                    let isActive: boolean =
                                        navLink.href === pathName;
                                    if (navLink?.children) {
                                        return renderSubNavLink(
                                            navLink,
                                            navLink.children
                                        );
                                    }

                                    return (
                                        <li
                                            key={navLink.href}
                                            className={`${
                                                isActive &&
                                                "bg-[#E4E4E7] shadow"
                                            } rounded-lg`}
                                        >
                                            <Link
                                                className="flex items-center px-2 py-4"
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

                        <div className="p-3 rounded-lg bg-gray-100 mt-5">
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
