"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Logo from "@/components/UI/Logo";
import useFirebaseAuthStore from "@/hooks/useFirebaseAuthStore";
import useCurrentUser from "@/hooks/useCurrentUser";

interface IUserRegister {
    username: string;
    password: string;
    email: string;
    confirm: string;
}

function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IUserRegister>();

    const {
        handleCreateAccount,
        loading,
        error: authErrorMessage,
    } = useFirebaseAuthStore();
    const router = useRouter();

    const { currentUser } = useCurrentUser();

    const onSubmitHandler = async (
        data: IUserRegister,
        e?: React.BaseSyntheticEvent
    ): Promise<void> => {
        e?.preventDefault();

        try {
            await handleCreateAccount(data.username, data.email, data.password);
            router.push("/");
        } catch (error) {
            console.log("error: ", error);
        }
    };

    useEffect(() => {
        // if (currentUser.role === "admin")router.push("/admin");

        if (currentUser) {
            router.push("/");
        }
    }, [currentUser]);
    return (
        <>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className="w-[400px] bg-white p-5 rounded-lg"
                >
                    <div>
                        <Logo />
                        <h4 className="text-center text-primary text-2xl mb-5 mt-3">
                            Create your account
                        </h4>
                    </div>
                    <div className="mb-5">
                        <input
                            className="w-full outline-none p-3 border border-slate-300 rounded-md"
                            type="text"
                            placeholder="User name"
                            {...register("username", {
                                required: true,
                                maxLength: 20,
                            })}
                        />
                        {errors?.username?.type === "required" && (
                            <p className="text-red-500 mt-3">
                                Please enter name
                            </p>
                        )}
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
                    <div className="mb-5">
                        <input
                            className="w-full outline-none p-3 border border-slate-300 rounded-md"
                            type="password"
                            placeholder="Confirm password"
                            {...register("confirm", {
                                required: true,
                                validate: (value) => {
                                    if (
                                        watch("password") !== value ||
                                        watch("password") === ""
                                    )
                                        return "Your password do not match";
                                },
                            })}
                        />
                        {errors.confirm?.type === "validate" && (
                            <p className="text-red-500 mt-3">
                                {errors.confirm?.message}
                            </p>
                        )}
                        {errors.confirm?.type === "required" && (
                            <p className="text-red-500 mt-3">
                                Please enter confirm password
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
                        className="w-full"
                        color="primary"
                        size="lg"
                    >
                        Create account
                    </Button>

                    <div className="flex items-center justify-center pt-4 mt-4 border-t border-t-gray-300">
                        <p>
                            Already have an account? &nbsp;
                            <Link className="text-primary" href="/login">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;
