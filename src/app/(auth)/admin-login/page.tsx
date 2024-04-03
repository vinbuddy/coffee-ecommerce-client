"use client";
import React, { useState } from "react";
import {
    Tabs,
    Tab,
    Input,
    Button,
    Card,
    CardBody,
    CardHeader,
    Select,
    SelectItem,
} from "@nextui-org/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Logo from "@/components/UI/Logo";

interface IStoreLogin {
    password: string;
}
interface IAdminLogin {
    email: string;
    password: string;
}

const stores = [
    { id: "store1", store_name: "Chi nhánh Tân Phú" },
    { id: "store2", store_name: "Chi nhánh Quận 1" },
];

export default function AdminLoginPage(): React.ReactNode {
    const {
        register: storeRegister,
        handleSubmit: handleSubmitStore,
        formState: { errors: storeErrors },
    } = useForm<IStoreLogin>();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IAdminLogin>();

    const [selected, setSelected] = useState<string | number>("store");

    return (
        <div>
            <Card className="max-w-full w-[440px] min-h-[325px]">
                <CardBody className="overflow-hidden">
                    <div>
                        <Logo className="flex justify-center" />
                    </div>

                    <Tabs
                        variant="underlined"
                        fullWidth
                        size="lg"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                        className="mt-5"
                    >
                        <Tab
                            key="store"
                            title="Cửa hàng"
                            className="!outline-0"
                        >
                            <form
                                autoComplete="off"
                                className="flex flex-col gap-5"
                            >
                                <Select size="lg" placeholder="Chọn cửa hàng">
                                    {stores.map((store) => (
                                        <SelectItem
                                            key={store.id}
                                            value={store.id}
                                        >
                                            {store.store_name}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <div>
                                    <input
                                        className="w-full outline-none p-3 border border-slate-300 rounded-xl"
                                        type="password"
                                        placeholder="Password"
                                        {...storeRegister("password", {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 15,
                                        })}
                                    />

                                    {storeErrors.password?.type ===
                                        "required" && (
                                        <p className="text-red-500 mt-3">
                                            Please enter password
                                        </p>
                                    )}
                                    {storeErrors.password?.type ===
                                        "minLength" && (
                                        <p className="text-red-500 mt-3">
                                            Please enter at least 6 characters
                                        </p>
                                    )}
                                    {storeErrors.password?.type ===
                                        "maxLength" && (
                                        <p className="text-red-500 mt-3">
                                            Please enter up to 15 characters
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2 justify-end">
                                    <Button size="lg" fullWidth color="primary">
                                        Đăng nhập
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab key="admin" title="Admin" className="!outline-0">
                            <form className="flex flex-col gap-4">
                                <div>
                                    <input
                                        className="w-full outline-none p-3 border border-slate-300 rounded-xl"
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
                                <div>
                                    <input
                                        className="w-full outline-none p-3 border border-slate-300 rounded-xl"
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
                                <div className="flex gap-2 justify-end">
                                    <Button size="lg" fullWidth color="primary">
                                        Đăng nhập
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );
}
