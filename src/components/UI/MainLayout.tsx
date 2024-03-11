"use client";
import { ReactNode } from "react";
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

interface Props {
    children?: ReactNode;
}

export default function MainLayout({ children }: Props): React.ReactNode {
    const { currentUser } = useCurrentUser();
    return (
        <>
            <header className="z-20 fixed top-0 left-0 right-0 border-b bg-white">
                <div className="container">
                    <Navbar maxWidth="full">
                        <NavbarBrand>
                            <Logo />
                        </NavbarBrand>
                        <NavbarContent
                            as="div"
                            className="hidden sm:flex gap-6"
                            justify="center"
                        >
                            <NavbarItem isActive aria-current="page">
                                <Link color="foreground" href="#">
                                    Home
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link color="foreground" href="#">
                                    Coffee
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link href="#">Tea</Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link color="foreground" href="#">
                                    Menu
                                </Link>
                            </NavbarItem>
                        </NavbarContent>
                        <NavbarContent justify="end">
                            {currentUser ? (
                                <div className="flex items-center ">
                                    <Tooltip
                                        content="Your cart"
                                        placement="left-start"
                                        closeDelay={0}
                                    >
                                        <Link
                                            href="/cart"
                                            className="relative me-5"
                                        >
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

                                    <Dropdown placement="bottom-end">
                                        <DropdownTrigger>
                                            <Avatar
                                                isBordered
                                                as="button"
                                                className="transition-transform"
                                                color="default"
                                                name="Jason Hughes"
                                                size="sm"
                                                src={currentUser.photoURL || ""}
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
                                                    Signed in as
                                                </p>
                                                <p className="font-semibold">
                                                    {currentUser.email}
                                                </p>
                                            </DropdownItem>
                                            <DropdownItem key="team_settings">
                                                Profile
                                            </DropdownItem>
                                            <DropdownItem key="settings">
                                                Cart
                                            </DropdownItem>

                                            <DropdownItem key="analytics">
                                                Orders
                                            </DropdownItem>
                                            <DropdownItem
                                                key="logout"
                                                color="danger"
                                                className="text-danger"
                                            >
                                                Log Out
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            ) : (
                                <>
                                    <NavbarItem className="hidden lg:flex">
                                        <Link href="#">Sign up</Link>
                                    </NavbarItem>
                                    <NavbarItem>
                                        <Button
                                            as={Link}
                                            color="primary"
                                            href="/login"
                                            variant="flat"
                                        >
                                            Sign in
                                        </Button>
                                    </NavbarItem>
                                </>
                            )}
                        </NavbarContent>
                    </Navbar>
                </div>
            </header>
            <div className="mt-[85px]">{children}</div>
        </>
    );
}
