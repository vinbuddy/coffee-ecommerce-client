import React from "react";
import { Button, Card, CardHeader, Image, Tooltip } from "@nextui-org/react";

import banner2 from "@/assets/images/banner2.png";
import banner4 from "@/assets/images/banner4.jpg";
import coffeeIcon from "@/assets/images/coffee-icon.png";
import teaIcon from "@/assets/images/tea-icon.png";
import foodIcon from "@/assets/images/food-icon.png";

import Link from "next/link";
import MainLayout from "@/components/UI/MainLayout";
import ProductCard from "@/components/Product/ProductCard";

import { MdArrowOutward } from "react-icons/md";

export default function Home() {
    return (
        <MainLayout>
            <div className="container ">
                <div className="px-6">
                    {/* Banner */}
                    <section className="gap-5 grid grid-cols-12">
                        <Card className="w-full h-[300px] col-span-12 sm:col-span-6">
                            <Link className="h-full" href="">
                                <Image
                                    removeWrapper
                                    alt="Relaxing app background"
                                    className="z-0 w-full h-full object-cover"
                                    src={banner4.src}
                                />
                            </Link>
                        </Card>
                        <Card className="col-span-12 sm:col-span-3 h-[300px]">
                            <Link className="h-full" href="">
                                <Image
                                    removeWrapper
                                    alt="Card background"
                                    className="z-0 w-full h-full object-cover"
                                    src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/430996243_417129577344825_3847305229450240265_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=lUCDhqRLeF0AX8GUmnX&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfAQRd_zNwkRZjP-EARbySNIVoT5mVsUuNMu8Rbsfdf7XQ&oe=65F14B57"
                                />
                            </Link>
                        </Card>
                        <Card className="col-span-12 sm:col-span-3 h-[300px]">
                            <Link className="h-full" href="">
                                <CardHeader className="absolute z-[1] top-1 flex-col !items-start">
                                    <h4 className="text-primary bg-white rounded-xl px-3 font-medium">
                                        Hoa nước xinh yêu
                                    </h4>
                                </CardHeader>
                                <Image
                                    removeWrapper
                                    alt="Card background"
                                    className="z-0 w-full h-full object-cover"
                                    src={banner2.src}
                                />
                            </Link>
                        </Card>
                    </section>

                    <section className="mt-12 flex justify-center flex-col text-center">
                        <h2 className="text-2xl font-medium">
                            Discover The Art Of Perfect Coffee And Tea
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Experience the difference as we meticulously select
                            and roast the finest beans to create a truly
                            unforgettable cup of coffee. Join us on a journey of
                            taste and awaken your senses, one sip at a time.
                        </p>

                        <div className="flex items-center justify-center my-5">
                            <Tooltip
                                content="Coffee"
                                placement="left"
                                closeDelay={0}
                            >
                                <Image
                                    width={85}
                                    height={85}
                                    src={coffeeIcon.src}
                                    alt="coffe icon"
                                />
                            </Tooltip>
                            <div className="mx-10">
                                <Tooltip content="Tea" closeDelay={0}>
                                    <Image
                                        width={85}
                                        height={85}
                                        src={teaIcon.src}
                                        alt="tea icon"
                                    />
                                </Tooltip>
                            </div>
                            <Tooltip
                                content="Foods"
                                placement="right"
                                closeDelay={0}
                            >
                                <Image
                                    width={85}
                                    height={85}
                                    src={foodIcon.src}
                                    alt="food icon"
                                />
                            </Tooltip>
                        </div>

                        <div className="mt-2">
                            <Button
                                className="ps-3 pe-2"
                                radius="full"
                                color="primary"
                                variant="flat"
                                as={Link}
                                href="/menu"
                                endContent={
                                    <div className="bg-white p-1.5 rounded-full">
                                        <MdArrowOutward className="!text-primary" />
                                    </div>
                                }
                            >
                                Order Now
                            </Button>
                        </div>
                    </section>

                    {/* Outlet Best seller */}
                    <section className="mt-12">
                        <h2 className="text-3xl mb-5 font-medium text-center">
                            Best seller
                        </h2>
                        <div className="grid grid-cols-12 gap-10">
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                        </div>
                    </section>

                    {/* Outlet Coffee */}
                    <section className="mt-12">
                        <h2 className="text-3xl mb-5 font-medium text-center">
                            Coffee
                        </h2>
                        <div className="grid grid-cols-12 gap-x-10 gap-y-5">
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                        </div>
                        {/* <div className="grid grid-cols-12 gap-5 px-6">
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                        </div> */}
                    </section>

                    <section className="mt-12">
                        <h2 className="text-3xl mb-5 font-medium text-center">
                            Food
                        </h2>
                        <div className="grid grid-cols-12 gap-x-10 gap-y-5">
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                <ProductCard />
                            </div>
                        </div>
                    </section>

                    <section className="mt-12"></section>
                </div>
            </div>
        </MainLayout>
    );
}
