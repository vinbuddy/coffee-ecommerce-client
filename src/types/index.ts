import React from "react";

export interface INavLink {
    content: string;
    href: string;
    icon?: React.ReactNode;
    children?: INavLink[];
}

export type PaymentMethodType = "cash" | "momo" | "vnpay";
