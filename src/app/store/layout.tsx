import React from "react";
import MainLayout from "@/components/UI/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Danh sách cửa hàng",
    description: "Danh sách cửa hàng The Coffee House",
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
    return <MainLayout>{children}</MainLayout>;
}
