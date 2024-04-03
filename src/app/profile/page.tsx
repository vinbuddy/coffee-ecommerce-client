"use client";
import React from "react";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import Link from "next/link";
import {
    Avatar,
    Button,
    Input,
    Spacer,
    Tooltip,
    User,
} from "@nextui-org/react";
import { BiUser, BiPackage } from "react-icons/bi";
import { RiCoupon3Line } from "react-icons/ri";
import useCurrentUser from "@/hooks/useCurrentUser";

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/",
    },
    {
        content: "Trang cá nhân",
        href: "/profile",
    },
];

export default function ProfilePage(): React.ReactNode {
    const { currentUser } = useCurrentUser();

    return (
        <form className="rounded-xl">
            <h3 className="text-xl font-bold mb-5">Hồ sơ của tôi</h3>

            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-6">
                    <div>
                        <Input
                            isDisabled
                            size="md"
                            type="text"
                            label="Email"
                            name="email"
                            value={currentUser?.email || ""}
                        />
                        <Spacer y={6} />

                        <Input
                            size="md"
                            type="text"
                            name="user_name"
                            value={currentUser?.user_name || ""}
                        />

                        <Spacer y={6} />
                        <Button
                            className="w-full"
                            color="primary"
                            variant="flat"
                        >
                            Lưu thông tin
                        </Button>
                    </div>
                </div>
                <div className="col-span-6">
                    <div>
                        <label htmlFor="avatar">
                            <Tooltip
                                content="Cập nhật ảnh đại diện"
                                placement="bottom"
                                color="foreground"
                            >
                                <Avatar
                                    isBordered
                                    className="w-[300px] h-[300px] mx-auto cursor-pointer"
                                    src={currentUser?.avatar || ""}
                                />
                            </Tooltip>
                        </label>
                        <input
                            hidden
                            type="file"
                            name=""
                            id="avatar"
                            accept="image/png, image/jpeg"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
