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

    // const [authErrorMessage, setAuthErrorMessage] = useState<string>("");
    // const [loading, setLoading] = useState<boolean>(false);
    const {
        handleSignInGoogle,
        handleSignInGoogleEmailPassword,
        loading,
        error: authErrorMessage,
    } = useFirebaseAuthStore();
    const router = useRouter();

    const { currentUser } = useCurrentUser();

    useEffect(() => {
        // if (currentUser.role === "admin")router.push("/admin");

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
        <Card>
            <CardBody className="px-5">
                <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className="w-[400px] "
                >
                    <div>
                        <Logo className="flex justify-center" />
                        <h4 className="text-center text-primary font-medium text-2xl mt-2.5 mb-5">
                            Login
                        </h4>
                    </div>
                    <div className="mb-5">
                        <input
                            className="w-full outline-none p-3 border border-slate-300 rounded-md"
                            type="text"
                            placeholder="Email address"
                            {...register("email", {
                                required: true,
                                pattern:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                        />

                        {errors.email?.type === "required" && (
                            <p className="text-red-500 mt-3">
                                Please enter email
                            </p>
                        )}
                        {errors.email?.type === "pattern" && (
                            <p className="text-red-500 mt-3">
                                Please enter invalid email
                            </p>
                        )}
                    </div>
                    <div className="mb-5">
                        <input
                            className="w-full outline-none p-3 border border-slate-300 rounded-md"
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 15,
                            })}
                        />

                        {errors.password?.type === "required" && (
                            <p className="text-red-500 mt-3">
                                Please enter password
                            </p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p className="text-red-500 mt-3">
                                Please enter at least 6 characters
                            </p>
                        )}
                        {errors.password?.type === "maxLength" && (
                            <p className="text-red-500 mt-3">
                                Please enter up to 15 characters
                            </p>
                        )}
                    </div>
                    {authErrorMessage.length > 0 && (
                        <p className="text-red-500 my-3 text-center">
                            {authErrorMessage}
                        </p>
                    )}

                    <Button
                        isLoading={loading}
                        type="submit"
                        color="primary"
                        size="lg"
                        className="w-full text-lg"
                    >
                        Login
                    </Button>

                    <div className="pt-5 mt-5 border-t border-t-gray-100">
                        <Button
                            // type="button"
                            onClick={onSubmitGoogle}
                            size="lg"
                            className="bg-transparent border w-full"
                            startContent={<FcGoogle className="text-xl" />}
                        >
                            Google
                        </Button>
                    </div>

                    <div className="flex items-center justify-between  mt-4 ">
                        <Link className="text-gray-600" href="/forgot">
                            Forgot password?
                        </Link>
                        <Link className="text-primary" href="/register">
                            Register
                        </Link>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
