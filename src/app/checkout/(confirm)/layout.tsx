import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/UI/Header";

interface Props {
    children?: ReactNode;
}

export default function ResultCheckoutLayout({ children }: Props): React.ReactNode {
    return (
        <>
            <Header />

            {/* Content */}
            <div className="mt-[30px] flex justify-center items-center">{children}</div>
        </>
    );
}
