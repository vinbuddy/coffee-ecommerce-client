"use client";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function ProductSearchBar(): React.ReactNode {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();

    const [debounceTimer, setDebounceTimer] =
        useState<ReturnType<typeof setTimeout>>();

    const handleSearch = (value: string): void => {
        clearTimeout(debounceTimer);
        setDebounceTimer(
            setTimeout(() => {
                const params = new URLSearchParams(searchParams);

                if (value) {
                    params.set("name", value);
                } else {
                    params.delete("name");
                }

                router.replace(`${pathName}?${params.toString()}`);
                router.refresh();
            }, 500)
        );
    };

    const handleClear = (): void => {
        const params = new URLSearchParams(searchParams);

        params.delete("name");
        router.replace(`${pathName}?${params.toString()}`);
        router.refresh();
    };

    return (
        <Input
            isClearable
            classNames={{
                base: "w-full",
                inputWrapper: "border-1",
            }}
            defaultValue={searchParams.get("name")?.toString() || ""}
            placeholder="Tìm sản phẩm..."
            size="md"
            variant="bordered"
            startContent={<CiSearch size={18} />}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearch(e.target.value)
            }
            onClear={handleClear}
        />
    );
}
