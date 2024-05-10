import { Image } from "@nextui-org/react";
import logo from "@/assets/images/logo.png";

export default function LoadingPage(): React.ReactNode {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            {/* <div className="cup">
                <div className="bubble bubble-1"></div>
                <div className="bubble bubble-2"></div>
                <div className="bubble bubble-3"></div>
            </div> */}
            <Image removeWrapper className="w-[300px]" src={logo.src} alt="logo LoadingPage" />
        </div>
    );
}
