import React from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";

import banner2 from "@/assets/images/banner2.png";
import banner4 from "@/assets/images/banner4.jpg";
import Link from "next/link";
import MainLayout from "@/components/MainLayout";

export default function Home() {
    return (
        <MainLayout>
            <div className="container">
                <div className="gap-5 grid grid-cols-12 px-6">
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
                            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
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
                </div>
            </div>
        </MainLayout>
    );
}
