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
            <div className="mt-[85px]">{children}</div>

            {/* Footer */}
            <div className="pt-10 border">
                <Footer />
            </div>
        </>
    );
}
