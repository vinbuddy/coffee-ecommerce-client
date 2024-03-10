import { ReactNode } from "react";
import { BiShoppingBag, BiSearch } from "react-icons/bi";
import Image from "next/image";
import logoImg from "@/assets/images/logo.png";
import Link from "next/link";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
} from "@nextui-org/react";
import Logo from "./Logo";

interface Props {
    children?: ReactNode;
}

export default function MainLayout({ children }: Props): React.ReactNode {
    return (
        <>
            <header className="border-b">
                <div className="container">
                    <Navbar maxWidth="full" shouldHideOnScroll>
                        <NavbarBrand>
                            {/* <AcmeLogo /> */}
                            <Logo />
                            {/* <p className="font-bold text-xl">TheCoffeeHome</p> */}
                        </NavbarBrand>
                        <NavbarContent
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
                        </NavbarContent>
                    </Navbar>
                </div>
            </header>
            <div className="mt-5">{children}</div>
        </>
    );
}
