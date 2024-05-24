"use client";
import React, { use, useEffect, useState } from "react";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import Link from "next/link";
import { Avatar, Badge, Button, Input, Spacer, Tooltip, User } from "@nextui-org/react";
import { BiUser, BiPackage } from "react-icons/bi";
import { RiCoupon3Line } from "react-icons/ri";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoading from "@/hooks/useLoading";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase";
import useFirebaseAuthStore from "@/hooks/useFirebaseAuthStore";
import { toast } from "sonner";
import { AiOutlineClose } from "react-icons/ai";

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

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [name, setName] = useState<string>(currentUser?.user_name || "");

    const { loading, startLoading, stopLoading } = useLoading();
    const { handleUpdateProfile } = useFirebaseAuthStore();

    useEffect(() => {
        return () => {
            if (imageURL && imageFile) URL.revokeObjectURL(imageURL);
        };
    }, [imageFile]);

    const handlePreviewAvatar = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!e.target?.files) return;

        const file = e.target.files[0];

        if (file) {
            setImageFile(file);
            setImageURL(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (): Promise<void> => {
        if (!currentUser) return;

        startLoading();

        try {
            let avatarURL = "";

            if (imageFile && imageURL) {
                avatarURL = await uploadAvatar(imageFile);
            }

            await updateProfile(name, avatarURL);
            await updateProfileRequest(name, avatarURL);
            clearUpdateState();

            toast.success("Cập nhật thông tin thành công", {
                position: "bottom-center",
            });
        } catch (error) {
            toast.error("Cập nhật thông tin thất bại", {
                position: "bottom-center",
            });
            console.error(error);
        } finally {
            stopLoading();
        }
    };

    const uploadAvatar = async (file: File): Promise<string> => {
        const avatarRef = ref(storage, `images/avatar/${Date.now()}${file.name}`);
        await uploadBytes(avatarRef, file);
        return await getDownloadURL(avatarRef);
    };

    const updateProfile = async (name: string, avatarURL: string): Promise<void> => {
        if (!currentUser) return;

        const isNameChanged = name.trim() != currentUser.user_name;

        if (avatarURL && isNameChanged) {
            await handleUpdateProfile(name, avatarURL);
        } else if (avatarURL && !isNameChanged) {
            await handleUpdateProfile("", avatarURL);
        } else if (!avatarURL && isNameChanged) {
            await handleUpdateProfile(name);
        }
    };

    const updateProfileRequest = async (name: string, avatarURL: string): Promise<void> => {
        if (!currentUser) return;

        const isNameChanged = name.trim() != currentUser?.user_name;
        let body;

        if (avatarURL && isNameChanged) {
            body = { avatar: avatarURL, user_name: name };
        } else if (avatarURL && !isNameChanged) {
            body = { avatar: avatarURL };
        } else if (!avatarURL && isNameChanged) {
            body = { user_name: name };
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${currentUser?.id}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resData = await response.json();
            if (response.status == 200) {
                useCurrentUser.setState((state) => ({
                    currentUser: resData.data,
                }));
            } else {
                throw new Error(resData.message);
            }
        } catch (error: any) {
            toast.error(error.message, { position: "bottom-center" });
            console.error(error);
        }
    };

    const clearUpdateState = (): void => {
        setName(name);
        removeImage();
    };

    const removeImage = (): void => {
        if (imageFile && imageURL) {
            URL.revokeObjectURL(imageURL);
            setImageFile(null);
            setImageURL(null);
        }
    };

    return (
        <form className="rounded-xl">
            <h3 className="text-xl font-bold mb-5">Hồ sơ của tôi</h3>

            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-7">
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
                            onValueChange={(value: string) => setName(value)}
                            size="md"
                            type="text"
                            name="user_name"
                            value={name}
                        />

                        <Spacer y={6} />
                        <Button
                            isDisabled={!imageFile && name.trim() == currentUser?.user_name}
                            isLoading={loading}
                            onClick={handleSubmit}
                            className="w-full"
                            color="primary"
                            variant="flat"
                        >
                            Lưu thông tin
                        </Button>
                    </div>
                </div>
                <div className="col-span-5">
                    <div>
                        <Tooltip closeDelay={0} content="Cập nhật ảnh đại diện" placement="bottom" color="foreground">
                            <label htmlFor="avatar">
                                <Avatar
                                    isBordered
                                    className="w-[300px] h-[300px] mx-auto cursor-pointer"
                                    src={imageURL || currentUser?.avatar || ""}
                                />
                            </label>
                        </Tooltip>
                        {imageFile && imageURL && (
                            <div className="mt-5 flex justify-center">
                                <Button onClick={() => removeImage()} color="danger" radius="full" variant="light">
                                    Gỡ ảnh đại diện
                                </Button>
                            </div>
                        )}

                        <input
                            onChange={handlePreviewAvatar}
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
