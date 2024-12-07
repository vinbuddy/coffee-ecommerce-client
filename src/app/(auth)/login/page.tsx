"use client";

import { useEffect } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Logo from "@/components/UI/Logo";
import { FcGoogle } from "react-icons/fc";
import useFirebaseAuthStore from "@/hooks/useFirebaseAuthStore";
import useCurrentUser from "@/hooks/useCurrentUser";

interface IUserLogin {
    password: string;
    email: string;
}

export default function LoginPage(): React.ReactNode {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IUserLogin>();

    const {
        handleSignInGoogle,
        handleSignInGoogleEmailPassword,
        loading,
        error: authErrorMessage,
    } = useFirebaseAuthStore();
    const router = useRouter();

    const { currentUser } = useCurrentUser();

    useEffect(() => {
        document.title = "Đăng nhập";
    }, []);

    useEffect(() => {
        if (currentUser) {
            router.push("/");
        }
    }, [currentUser]);

    const onSubmitHandler = async (data: IUserLogin) => {
        try {
            await handleSignInGoogleEmailPassword(data.email, data.password);
            router.push("/");
        } catch (error) {}
    };
    const onSubmitGoogle = async (): Promise<void> => {
        try {
            await handleSignInGoogle();
            router.push("/");
        } catch (error) {}
    };
    return (
        <Card className="md:w-fit w-full">
            <CardBody className="px-5">
                <form onSubmit={handleSubmit(onSubmitHandler)} className="md:w-[400px] w-full">
                    <div>
                        <Logo className="flex justify-center" />
                        <h4 className="text-center text-primary font-medium text-2xl mt-2.5 mb-5">Đăng Nhập</h4>
                    </div>
                    <div className="mb-5">
                        <input
                            className="w-full outline-none p-3 border border-slate-300 rounded-md"
                            type="text"
                            placeholder="Địa chỉ email"
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
                    <div className="mb-5">
                        <input
                            className="w-full outline-none p-3 border border-slate-300 rounded-md"
                            type="password"
                            placeholder="Mật khẩu"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 15,
                            })}
                        />

                        {errors.password?.type === "required" && <p className="text-red-500 mt-3">Hãy nhập mật khẩu</p>}
                        {errors.password?.type === "minLength" && (
                            <p className="text-red-500 mt-3">Hãy nhập mật khẩu tối thiểu 6 ký tự</p>
                        )}
                        {errors.password?.type === "maxLength" && (
                            <p className="text-red-500 mt-3">Hãy nhập mật khẩu tối đa 15 ký tự</p>
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
                        Đăng nhập
                    </Button>

                    <div className="pt-5 mt-5 border-t border-t-gray-100">
                        <Button
                            onClick={onSubmitGoogle}
                            size="lg"
                            className="bg-transparent border w-full"
                            startContent={<FcGoogle className="text-xl" />}
                        >
                            Tiếp tục với Google
                        </Button>
                    </div>

                    <div className="flex items-center justify-between  mt-4 ">
                        <Link className="text-gray-600" href="/forgot">
                            Quên mật khẩu?
                        </Link>
                        <Link className="text-primary" href="/register">
                            Đăng ký
                        </Link>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
