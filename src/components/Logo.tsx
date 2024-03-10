import Image from "next/image";
import Link from "next/link";
import logoImg from "@/assets/images/logo.png";

export default function Logo(): React.ReactNode {
    return (
        <Link href="/">
            <Image className="w-[230px] mx-auto block" src={logoImg} alt="" />
        </Link>
    );
}
