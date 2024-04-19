import React from "react";
import MainLayout from "@/components/UI/MainLayout";

export default function StoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
