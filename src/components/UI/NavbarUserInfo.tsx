"use client";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    NavbarItem,
} from "@nextui-org/react";

import useCurrentUser from "@/hooks/useCurrentUser";
import avatarFallback from "@/assets/images/avatar-fallback.jpg";
import Link from "next/link";
import useFirebaseAuthStore from "@/hooks/useFirebaseAuthStore";

export default function NavbarUserInfo() {
    const { currentUser } = useCurrentUser();
    const { handleSignOut } = useFirebaseAuthStore();
    return (
        <>
            {currentUser ? (
                <>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="default"
                                name={currentUser?.user_name || ""}
                                size="sm"
                                src={currentUser?.avatar || avatarFallback.src}
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Profile Actions"
                            variant="flat"
                        >
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Đăng nhập bằng</p>
                                <p className="font-semibold">
                                    {currentUser?.email}
                                </p>
                            </DropdownItem>
                            <DropdownItem
                                as={Link}
                                href="/profile"
                                key="profile"
                            >
                                Trang cá nhân
                            </DropdownItem>
                            <DropdownItem as={Link} href="/cart" key="cart">
                                Giỏ hàng
                            </DropdownItem>

                            <DropdownItem
                                as={Link}
                                href="/profile/order"
                                key="user-order"
                            >
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
        </>
    );
}
