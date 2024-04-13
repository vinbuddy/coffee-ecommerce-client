import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function CartItemSkeleton(): React.ReactNode {
    return (
        <div className="h-[140px] flex mb-5">
            <Skeleton className="h-full w-[140px] rounded-xl me-3" />
            <div className="h-full flex flex-col justify-between flex-1">
                <Skeleton className="h-5 w-1/3 rounded-xl mb-2" />
                <Skeleton className="h-5 w-1/5 rounded-xl mb-2" />
                <Skeleton className="h-5 w-1/5 rounded-xl mb-2" />
                <Skeleton className="h-5 w-1/3 rounded-xl mb-2" />
            </div>
        </div>
    );
}
