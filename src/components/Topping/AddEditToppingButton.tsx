"use client";
import useLoading from "@/hooks/useLoading";
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

interface IProps {
    toppingValue?: string;
    toppingPriceValue?: string;
    toppingId?: number;
    buttonProps: ButtonProps;
}

export default function AddEditToppingButton({
    toppingValue = "",
    toppingPriceValue = "",
    toppingId,
    buttonProps,
}: IProps) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [toppingName, setToppingName] = useState<string>(toppingValue);
    const [toppingPrice, setToppingPrice] = useState<string | number>(toppingPriceValue);
    const { startLoading, stopLoading, loading } = useLoading();
    const router = useRouter();

    const handleSubmit = (): void => {
        if (toppingName === "") return;

        if (Boolean(toppingValue)) {
            handleEditTopping();
        } else {
            handleAddTopping();
        }
    };

    const handleAddTopping = async (): Promise<void> => {
        try {
            startLoading();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topping`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ topping_name: toppingName.trim(), topping_price: Number(toppingPrice) }),
            });

            const data = await response.json();

            if (response.status === 200) {
                router.refresh();

                toast.success("Thêm topping thành công", {
                    position: "bottom-center",
                });
            } else {
                throw new Error(data.message);
            }
        } catch (error: any) {
            toast.error("Thêm topping thất bại", {
                position: "bottom-center",
                description: error.message,
            });
        } finally {
            stopLoading();

            setToppingName("");
            setToppingPrice("");

            onClose();
        }
    };

    const handleEditTopping = async (): Promise<void> => {
        if (!toppingId) return;
        try {
            startLoading();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topping/${toppingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ topping_name: toppingName.trim(), topping_price: Number(toppingPrice) }),
            });

            const data = await response.json();

            if (response.status === 200) {
                router.refresh();
                toast.success("Chỉnh sửa topping thành công", {
                    position: "bottom-center",
                });
            } else {
                throw new Error(data.message);
            }
        } catch (error: any) {
            toast.error("Chỉnh sửa topping thất bại", {
                position: "bottom-center",
                description: error.message,
            });
        } finally {
            stopLoading();

            setToppingName("");
            setToppingPrice("");

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
                                {Boolean(toppingValue) ? "Chỉnh sửa topping" : "Thêm topping"}
                            </ModalHeader>
                            <ModalBody className="pt-0 px-6">
                                <Input
                                    onValueChange={(value) => setToppingName(value)}
                                    value={toppingName}
                                    placeholder="Nhập tên"
                                    variant="bordered"
                                    radius="md"
                                />
                                <Input
                                    type="number"
                                    min={0}
                                    onValueChange={(value) => setToppingPrice(value)}
                                    value={toppingPrice.toString()}
                                    placeholder="Nhập giá"
                                    variant="bordered"
                                    radius="md"
                                />
                            </ModalBody>
                            <ModalFooter className="flex justify-between pb-6">
                                <Button
                                    isLoading={loading}
                                    onClick={handleSubmit}
                                    isDisabled={
                                        toppingValue.trim() === toppingName.trim() ||
                                        toppingPriceValue.trim() === toppingPrice.toString()
                                    }
                                    fullWidth
                                    radius="md"
                                    className="bg-black text-white"
                                >
                                    {Boolean(toppingValue) ? "Chỉnh sửa" : "Thêm mới"}
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
