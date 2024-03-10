"use client";
// import { Button } from "antd";
import logoImg from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import Logo from "@/components/Logo";
// import { signIn } from "next-auth/react";

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

    const [authErrorMessage, setAuthErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<Boolean>(false);

    const onSubmitHandler = async (data: IUserLogin) => {
        setLoading(true);
        // const loginRes = await signIn("credentials", {
        //     email: data.email,
        //     password: data.password,
        //     callbackUrl: "/",
        // });

        // if (loginRes?.error) {
        //     setAuthErrorMessage("Something went wrong!!");
        //     setLoading(false);
        //     return;
        // }

        setLoading(false);
    };
    return (
        <Card>
            <CardBody className="px-5">
                <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className="w-[400px] "
                >
                    <div>
                        <Logo />
                        <h4 className="text-center text-primary text-3xl mb-5">
                            Login to website
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
                        color="primary"
                        size="lg"
                        className="w-full text-lg"
                    >
                        Login
                    </Button>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-t-gray-300">
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
