import React from "react";

export interface INavLink {
    content: string;
    href: string;
    icon?: React.ReactNode;
    children?: INavLink[];
}

export type PaymentMethodType = "cash" | "momo" | "vnpay";

// Re-export all types
export * from "./cart";
export * from "./category";
export * from "./order";
export * from "./product";
export * from "./review";
export * from "./size";
export * from "./store";
export * from "./topping";
export * from "./user";
export * from "./voucher";
export * from "./wishlist";
