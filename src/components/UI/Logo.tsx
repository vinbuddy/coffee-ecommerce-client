import Image from "next/image";
import Link from "next/link";
import logoImg from "@/assets/images/logo.png";

interface IProps {
    className?: string;
    href?: string;
}

export default function Logo({ className = "", href = "/" }: IProps): React.ReactNode {
    return (
        <Link className={className} href={href}>
            <Image className="w-[230px] h-[35px] block" src={logoImg} alt="" />
        </Link>
    );
}
