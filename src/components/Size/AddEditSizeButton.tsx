"use client";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    ModalFooter,
    Input,
    ButtonProps,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { useLoading } from "@/hooks";

interface IProps {
    sizeValue?: string;
    sizeId?: number;
    buttonProps: ButtonProps;
}

export default function AddEditSizeButton({ sizeValue = "", sizeId, buttonProps }: IProps) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [sizeName, setSizeName] = useState<string>(sizeValue);
    const { startLoading, stopLoading, loading } = useLoading();
    const router = useRouter();

    const handleSubmit = (): void => {
        if (sizeName === "") return;

        if (Boolean(sizeValue)) {
            handleEditSize();
        } else {
            handleAddSize();
        }
    };

    const handleAddSize = async (): Promise<void> => {
        try {
            startLoading();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/size`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ size_name: sizeName.trim() }),
            });

            const data = await response.json();

            if (response.status === 200) {
                router.refresh();
                toast.success("Thêm size thành công", {
                    position: "bottom-center",
                });
            } else {
                throw new Error(data.message);
            }
        } catch (error: any) {
            toast.error("Thêm size thất bại", {
                position: "bottom-center",
                description: error.message,
            });
        } finally {
            stopLoading();
            onClose();
        }
    };

    const handleEditSize = async (): Promise<void> => {
        if (!sizeId) return;
        try {
            startLoading();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/size/${sizeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ size_name: sizeName.trim() }),
            });

            const data = await response.json();

            if (response.status === 200) {
                router.refresh();
                toast.success("Chỉnh sửa size thành công", {
                    position: "bottom-center",
                });
            } else {
                throw new Error(data.message);
            }
        } catch (error: any) {
            toast.error("Chỉnh sửa size thất bại", {
                position: "bottom-center",
                description: error.message,
            });
        } finally {
            stopLoading();
            onClose();
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {Boolean(sizeValue) ? "Chỉnh sửa size" : "Thêm size"}
                            </ModalHeader>
                            <ModalBody className="pt-0 px-6">
                                <Input
                                    onValueChange={(value) => setSizeName(value)}
                                    value={sizeName}
                                    placeholder="Nhập tên size"
                                    variant="bordered"
                                    radius="md"
                                />
                            </ModalBody>
                            <ModalFooter className="flex justify-between pb-6">
                                <Button
                                    isLoading={loading}
                                    onClick={handleSubmit}
                                    isDisabled={sizeValue.trim() === sizeName.trim()}
                                    fullWidth
                                    radius="md"
                                    className="bg-black text-white"
                                >
                                    {Boolean(sizeValue) ? "Chỉnh sửa" : "Thêm mới"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Button
                size={buttonProps?.size}
                onPress={onOpen}
                type="button"
                as="button"
                variant={buttonProps?.variant}
                color={buttonProps?.color}
                radius={buttonProps?.radius}
                className={buttonProps?.className}
                isIconOnly={buttonProps?.isIconOnly ?? false}
            >
                {buttonProps?.children}
            </Button>
        </>
    );
}
