"use client";
import { CiCoffeeCup } from "react-icons/ci";
import Link from "next/link";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownItem,
    DropdownMenu,
    Badge,
    Tooltip,
} from "@nextui-org/react";
import Logo from "./Logo";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFirebaseAuthStore from "@/hooks/useFirebaseAuthStore";

import avatarFallback from "@/assets/images/avatar-fallback.jpg";
import { usePathname } from "next/navigation";

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
    const { currentUser } = useCurrentUser();
    const pathName = usePathname();
    const { handleSignOut } = useFirebaseAuthStore();

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
                        {navLinks.map((navLink, index) => {
                            return (
                                <NavbarItem
                                    isActive={pathName === navLink.href}
                                    key={index}
                                >
                                    <Link
                                        color="foreground"
                                        href={navLink.href}
                                    >
                                        {navLink.content}
                                    </Link>
                                </NavbarItem>
                            );
                        })}
                    </NavbarContent>
                    <NavbarContent justify="end" as="div">
                        <div className="flex items-center ">
                            <Tooltip
                                content="Giỏ hàng"
                                placement="left-start"
                                closeDelay={0}
                            >
                                <Link href="/cart" className="relative me-5">
                                    <Badge
                                        color="danger"
                                        content={2}
                                        size="md"
                                        shape="circle"
                                    >
                                        <CiCoffeeCup size={28} />
                                    </Badge>
                                </Link>
                            </Tooltip>
                            {currentUser ? (
                                <>
                                    <Dropdown placement="bottom-end">
                                        <DropdownTrigger>
                                            <Avatar
                                                isBordered
                                                as="button"
                                                className="transition-transform"
                                                color="default"
                                                name={
                                                    currentUser?.user_name || ""
                                                }
                                                size="sm"
                                                src={
                                                    currentUser?.avatar ||
                                                    avatarFallback.src
                                                }
                                            />
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="Profile Actions"
                                            variant="flat"
                                        >
                                            <DropdownItem
                                                key="profile"
                                                className="h-14 gap-2"
                                            >
                                                <p className="font-semibold">
                                                    Đăng nhập bằng
                                                </p>
                                                <p className="font-semibold">
                                                    {currentUser?.email}
                                                </p>
                                            </DropdownItem>
                                            <DropdownItem key="team_settings">
                                                Trang cá nhân
                                            </DropdownItem>
                                            <DropdownItem key="settings">
                                                Giỏ hàng
                                            </DropdownItem>

                                            <DropdownItem key="analytics">
                                                Các đơn hàng
                                            </DropdownItem>
                                            <DropdownItem
                                                key="logout"
                                                color="danger"
                                                className="text-danger"
                                                onClick={handleSignOut}
                                            >
                                                Đăng xuất
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </>
                            ) : (
                                <>
                                    <NavbarItem className="hidden lg:flex me-3">
                                        <Link href="/register">Đăng ký</Link>
                                    </NavbarItem>
                                    <NavbarItem>
                                        <Button
                                            as={Link}
                                            color="primary"
                                            href="/login"
                                            variant="flat"
                                        >
                                            Đăng nhập
                                        </Button>
                                    </NavbarItem>
                                </>
                            )}
                        </div>
                    </NavbarContent>
                </Navbar>
            </div>
        </header>
    );
}
