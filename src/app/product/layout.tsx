import React from "react";
import MainLayout from "@/components/UI/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Menu sản phẩm",
    description: "Menu sản phẩm của The Coffee House",
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
    return <MainLayout>{children}</MainLayout>;
}
