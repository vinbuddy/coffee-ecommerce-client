"use client";
import { INavLink } from "@/types";
import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
    navLinks: INavLink[];
}

export default function NavbarLinks({ navLinks }: IProps) {
    const pathName = usePathname();
    return (
        <>
            {navLinks.map((navLink, index) => {
                return (
                    <NavbarItem
                        isActive={pathName === navLink.href}
                        key={index}
                    >
                        <Link color="foreground" href={navLink.href}>
                            {navLink.content}
                        </Link>
                    </NavbarItem>
                );
            })}
        </>
    );
}
