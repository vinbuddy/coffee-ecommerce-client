"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import Logo from "@/components/UI/Logo";
import { FcGoogle } from "react-icons/fc";
import useFirebaseAuthStore from "@/hooks/useFirebaseAuthStore";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "sonner";

interface IResetPassword {
    email: string;
}

export default function ForgetPasswordPage(): React.ReactNode {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IResetPassword>();

    // const [authErrorMessage, setAuthErrorMessage] = useState<string>("");
    // const [loading, setLoading] = useState<boolean>(false);
    const { handelResetPassword, loading, error: authErrorMessage } = useFirebaseAuthStore();
    const router = useRouter();

    const { currentUser } = useCurrentUser();

    useEffect(() => {
        // if (currentUser.role === "admin")router.push("/admin");

        if (currentUser) {
            router.push("/");
        }
    }, [currentUser]);

    const onSubmitHandler = async (data: IResetPassword) => {
        try {
            await handelResetPassword(data.email);
            toast.success("Đã gửi đến địa chỉ email của bạn, vui lòng kiểm tra để đặt lại mật khẩu", {
                position: "bottom-center",
            });
        } catch (error: any) {
            console.log("error: ", error.message);
            toast.error("Đã xảy ra lỗi, vui lòng thử lại sau", {
                position: "bottom-center",
            });
        }
    };

    return (
        <Card>
            <CardBody className="p-5">
                <form onSubmit={handleSubmit(onSubmitHandler)} className="w-[400px] ">
                    <div className="mb-10">
                        <Logo className="flex justify-center" />
                        <h4 className="text-center text-primary font-medium text-2xl mt-2.5 mb-5">Quên Mật Khẩu</h4>
                    </div>
                    <div className="mb-5">
                        <input
                            className="w-full outline-none p-3 border border-slate-300 rounded-md"
                            type="text"
                            placeholder="Email address"
                            {...register("email", {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                        />

                        {errors.email?.type === "required" && (
                            <p className="text-red-500 mt-3">Hãy nhập địa chỉ email</p>
                        )}
                        {errors.email?.type === "pattern" && (
                            <p className="text-red-500 mt-3">Hãy nhập địa chỉ email hợp lệ</p>
                        )}
                    </div>

                    {authErrorMessage.length > 0 && <p className="text-red-500 my-3 text-center">{authErrorMessage}</p>}

                    <Button
                        isLoading={loading}
                        type="submit"
                        color="primary"
                        size="lg"
                        radius="sm"
                        className="w-full text-lg"
                    >
                        Reset mật khẩu
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}
