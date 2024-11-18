"use client";
import { ReactNode } from "react";
import { Avatar, Button } from "@nextui-org/react";

import Footer from "./Footer";
import Header from "./Header";

import chatBotCoffee from "@/assets/images/coffee-bot.png";
import ChatBotModal from "@/components/Bot/ChatbotModal";

interface Props {
    children?: ReactNode;
}

export default function MainLayout({ children }: Props): React.ReactNode {
    return (
        <>
            <Header />

            {/* Content */}
            <div className="mt-[64.8px] pt-5 mx-auto">{children}</div>

            <div className="fixed right-10 bottom-10 z-10">
                <Button className="ps-1.5 pe-2.5  bg-black text-white" radius="full">
                    <ChatBotModal>
                        <div className="gap-2 flex items-center">
                            <Avatar size="sm" src={chatBotCoffee.src} />
                            <span className="font-semibold">Drink With AI</span>
                        </div>
                    </ChatBotModal>
                </Button>
            </div>

            {/* Footer */}
            <div className="pt-10 border">
                <Footer />
            </div>
        </>
    );
}
