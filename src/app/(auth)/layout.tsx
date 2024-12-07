import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

export default function AuthLayout({ children }: Props): React.ReactNode {
    return <div className="bg-gray-100 w-screen h-screen flex items-center justify-center px-5">{children}</div>;
}
