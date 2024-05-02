"use client";

import { fetcher } from "@/lib/utils";
import { NextUIProvider } from "@nextui-org/react";
import { SWRConfig } from "swr";

export function NextProvider({ children }: { children: React.ReactNode }) {
    return <NextUIProvider className="h-full">{children}</NextUIProvider>;
}

export function SWRConfigProvider({ children }: { children: React.ReactNode }) {
    return (
        <SWRConfig
            value={{
                fetcher,
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
                refreshWhenOffline: false,
                refreshWhenHidden: false,
                refreshInterval: 0,
            }}
        >
            {children}
        </SWRConfig>
    );
}
