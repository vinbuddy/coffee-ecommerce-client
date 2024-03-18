import React from "react";
import MainLayout from "@/components/UI/MainLayout";

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
