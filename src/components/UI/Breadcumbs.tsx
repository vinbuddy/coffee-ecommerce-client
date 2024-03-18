"use client";
import React from "react";
import Link from "next/link";
import {
    Breadcrumbs as BreadcumbWrapper,
    BreadcrumbItem,
} from "@nextui-org/react";

export interface IBreadcumbItem {
    content: string;
    href: string;
}

interface IProps {
    breadcumbItems: IBreadcumbItem[];
}

export default function Breadcrumbs({
    breadcumbItems,
}: IProps): React.ReactNode {
    return (
        <div>
            <BreadcumbWrapper radius="full" variant="solid">
                {breadcumbItems.map((breadcumItem, index) => (
                    <BreadcrumbItem key={index}>
                        <Link href={breadcumItem.href || ""}>
                            {breadcumItem.content}
                        </Link>
                    </BreadcrumbItem>
                ))}
            </BreadcumbWrapper>
        </div>
    );
}
