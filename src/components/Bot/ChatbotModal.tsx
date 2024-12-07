"use client";

import useSWR from "swr";
import { useState } from "react";
import {
    Avatar,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalProps,
    useDisclosure,
} from "@nextui-org/react";
import { LuArrowRight } from "react-icons/lu";

import ProductCard from "../Product/ProductCard";
import chatBotCoffee from "@/assets/images/coffee-bot.png";
import { IProduct } from "@/types";

interface IProps {
    children?: React.ReactNode;
}

export default function ChatbotModal({ children }: IProps) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = useState<ModalProps["scrollBehavior"]>("inside");

    const [prompt, setPrompt] = useState("");
    const [message, setMessage] = useState("");
    const [suggestions, setSuggestions] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);

    const { data: productData } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product`);
    const initialProducts: IProduct[] = productData?.data || [];

    const handleSuggest = async () => {
        console.log(initialProducts);

        setLoading(true);
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: `Đây là danh sách sản phẩm trong cửa hàng: ${JSON.stringify(
                                            initialProducts
                                        )}. Dựa vào yêu cầu: "${prompt}" hãy trả về mảng sản phẩm ( array object ) phù hợp hoặc một thông báo nếu không có sản phẩm nào phù hợp ngắn gọn và không ghi dài dòng.`,
                                    },
                                ],
                            },
                        ],
                    }),
                }
            );

            const data = await response.json();

            let result = data.candidates[0].content.parts[0].text.trim();

            // Bỏ các text như ```json và ``` để parse JSON
            const start = result.indexOf("```json");
            const end = result.lastIndexOf("```");
            if (start !== -1 && end !== -1) {
                result = result.substring(start + 7, end).trim();
            }

            try {
                const suggestedProducts = JSON.parse(result);
                if (Array.isArray(suggestedProducts)) {
                    setSuggestions(suggestedProducts);
                    setMessage("");
                } else {
                    setMessage(result);
                    setSuggestions([]);
                }
            } catch (e) {
                setMessage(result || "Không có sản phẩm phù hợp với yêu cầu.");
                setSuggestions([]);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setMessage("Đã xảy ra lỗi khi lấy gợi ý.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div onClick={onOpen}>{children}</div>

            <Modal
                size="xl"
                isOpen={isOpen}
                scrollBehavior={scrollBehavior}
                onClose={onClose}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <div className="flex items-center gap-4">Gợi ý món với AI Chatbot</div>
                            </ModalHeader>
                            <ModalBody className="pt-0 px-6">
                                {/* Chatbot content */}
                                {suggestions?.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                                        {suggestions.map((product) => (
                                            <div key={product.id}>
                                                <ProductCard product={product} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {message && (
                                    <section className="flex items-center gap-4 mt-5">
                                        <Avatar isBordered size="sm" src={chatBotCoffee.src} />

                                        <p className="text-center text-neutral-500">{message}</p>
                                    </section>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                {/* Chatbot input */}
                                <section className="w-full">
                                    <Input
                                        classNames={{
                                            inputWrapper: "pe-2",
                                        }}
                                        radius="full"
                                        size="lg"
                                        placeholder="Hỏi gì đó về sản phẩm..."
                                        endContent={
                                            <Button
                                                className="bg-black text-white"
                                                isIconOnly
                                                radius="full"
                                                color="default"
                                                isLoading={loading}
                                                onClick={handleSuggest}
                                            >
                                                <LuArrowRight />
                                            </Button>
                                        }
                                        value={prompt}
                                        onValueChange={(value) => setPrompt(value)}
                                    />
                                </section>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
