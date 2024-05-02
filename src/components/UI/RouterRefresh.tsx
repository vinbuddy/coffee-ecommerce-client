"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RouterRefresh() {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, []);

    return <></>;
}
