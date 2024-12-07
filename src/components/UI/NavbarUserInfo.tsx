"use client";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { CiCoffeeCup } from "react-icons/ci";
import { TbBasketHeart } from "react-icons/tb";
import { BiLogOut, BiPackage, BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import avatarFallback from "@/assets/images/avatar-fallback.jpg";
import { useCurrentUser, useFirebaseAuthStore } from "@/hooks";

export default function NavbarUserInfo() {
    const { currentUser } = useCurrentUser();
    const { handleSignOut } = useFirebaseAuthStore();
    const router = useRouter();

    const handleSignOutClick = () => {
        handleSignOut(() => {
            router.push("/login");
            toast.success("Đăng xuất thành công", {
                position: "bottom-center",
            });
        });
    };

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
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Đăng nhập bằng</p>
                                <p className="font-semibold">{currentUser?.account_type}</p>
                            </DropdownItem>
                            <DropdownItem startContent={<BiUser />} as={Link} href="/profile" key="profile">
                                Trang cá nhân
                            </DropdownItem>
                            <DropdownItem startContent={<CiCoffeeCup />} as={Link} href="/cart" key="cart">
                                Giỏ hàng
                            </DropdownItem>
                            <DropdownItem
                                startContent={<TbBasketHeart />}
                                as={Link}
                                href="/profile/wishlist"
                                key="cart"
                            >
                                Sản phẩm yêu thích
                            </DropdownItem>

                            <DropdownItem startContent={<BiPackage />} as={Link} href="/profile/order" key="user-order">
                                Các đơn hàng
                            </DropdownItem>
                            <DropdownItem
                                startContent={<BiLogOut />}
                                key="logout"
                                color="danger"
                                className="text-danger"
                                onClick={handleSignOutClick}
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
                        <Button as={Link} color="primary" href="/login" variant="flat">
                            Đăng nhập
                        </Button>
                    </NavbarItem>
                </>
            )}
        </>
    );
}
