import Image from "next/image";
import Link from "next/link";
import logoImg from "@/assets/images/logo.png";

interface IProps {
    className?: string;
}

export default function Logo({ className = "" }: IProps): React.ReactNode {
    return (
        <Link className={className} href="/">
            <Image className="w-[230px] block" src={logoImg} alt="" />
        </Link>
    );
}
