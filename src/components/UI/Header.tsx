"use client";

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Logo from "./Logo";

import CartBadge from "../Cart/CartBadge";
import NavbarUserInfo from "./NavbarUserInfo";
import NavbarLinks from "./NavbarLinks";

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
        href: "/voucher",
    },
    {
        content: "Cửa hàng",
        href: "/store",
    },
];

export default function Header(): React.ReactNode {
    return (
        <header className="z-20 fixed top-0 left-0 right-0 border-b bg-white">
            <div className="container">
                <Navbar maxWidth="full">
                    <NavbarBrand>
                        <Logo />
                    </NavbarBrand>
                    <NavbarContent
                        as="ul"
                        className="hidden sm:flex gap-6"
                        justify="center"
                    >
                        <NavbarLinks navLinks={navLinks} />
                    </NavbarContent>
                    <NavbarContent justify="end" as="div">
                        <div className="flex items-center ">
                            <CartBadge />

                            <NavbarUserInfo />
                        </div>
                    </NavbarContent>
                </Navbar>
            </div>
        </header>
    );
}
