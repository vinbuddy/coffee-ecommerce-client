import React from "react";

export interface INavLink {
    content: string;
    href: string;
    icon?: React.ReactNode;
    children?: INavLink[];
}
