"use client";
import dynamic from "next/dynamic";

const OnlineCheckoutPage = dynamic(() => import("./OnlineCheckoutPageComponent"), {
    ssr: false,
});

export default function Page() {
    return <OnlineCheckoutPage />;
}
