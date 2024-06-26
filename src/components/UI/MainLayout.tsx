"use client";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
interface Props {
    children?: ReactNode;
}

export default function MainLayout({ children }: Props): React.ReactNode {
    return (
        <>
            <Header />

            {/* Content */}
            <div className="mt-[64.8px] pt-5 mx-auto">{children}</div>

            {/* Footer */}
            <div className="pt-10 border">
                <Footer />
            </div>
        </>
    );
}
