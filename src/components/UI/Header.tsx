"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import Logo from "./Logo";

import CartBadge from "../Cart/CartBadge";
import NavbarUserInfo from "./NavbarUserInfo";
import NavbarLinks from "./NavbarLinks";
import ShowOrderStatusButton from "../Order/ShowOrderStatusButton";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
    {
        content: "Trang chủ",
        href: "/",
    },
    {
        content: "Menu",
        href: "/product",
    },
    {
        content: "Khuyến mãi",
        href: "/profile/voucher",
    },
    {
        content: "Cửa hàng",
        href: "/store",
    },
];

export default function Header(): React.ReactNode {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathName = usePathname();

    return (
        <header className="z-20 fixed top-0 left-0 right-0 border-b bg-white">
            <div className="container">
                <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
                    <NavbarBrand>
                        <NavbarMenuToggle
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            className="sm:hidden me-3 p-4"
                        />
                        <Logo className="hidden sm:block" />
                    </NavbarBrand>
                    <NavbarContent as="ul" className="hidden sm:flex gap-6" justify="center">
                        <NavbarLinks navLinks={navLinks} />
                    </NavbarContent>
                    <NavbarContent justify="end" as="div">
                        <div className="flex items-center gap-x-5">
                            <ShowOrderStatusButton />
                            <CartBadge />

                            <NavbarUserInfo />
                        </div>
                    </NavbarContent>
                    <NavbarMenu className="px-10">
                        {navLinks.map((navLink, index) => {
                            return (
                                <NavbarMenuItem isActive={pathName === navLink.href} key={index}>
                                    <Link color="foreground" href={navLink.href}>
                                        {navLink.content}
                                    </Link>
                                </NavbarMenuItem>
                            );
                        })}
                    </NavbarMenu>
                </Navbar>
            </div>
        </header>
    );
}
