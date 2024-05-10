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
    categoryValue?: string;
    categoryId?: number;
    buttonProps: ButtonProps;
}

export default function AddEditCategoryButton({ categoryValue = "", categoryId, buttonProps }: IProps) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [categoryName, setCategoryName] = useState<string>(categoryValue);
    const { startLoading, stopLoading, loading } = useLoading();
    const router = useRouter();

    const handleSubmit = (): void => {
        if (categoryName === "") return;

        if (Boolean(categoryValue)) {
            handleEditCategory();
        } else {
            handleAddCategory();
        }
    };

    const handleAddCategory = async (): Promise<void> => {
        try {
            startLoading();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ category_name: categoryName.trim() }),
            });

            const data = await response.json();

            if (response.status === 200) {
                router.refresh();
                toast.success("Thêm danh mục thành công", {
                    position: "bottom-center",
                });
            } else {
                throw new Error(data.message);
            }
        } catch (error: any) {
            toast.error("Thêm danh mục thất bại", {
                position: "bottom-center",
                description: error.message,
            });
        } finally {
            stopLoading();
            onClose();
        }
    };

    const handleEditCategory = async (): Promise<void> => {
        if (!categoryId) return;
        try {
            startLoading();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/${categoryId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ category_name: categoryName.trim() }),
            });

            const data = await response.json();

            if (response.status === 200) {
                router.refresh();
                toast.success("Chỉnh sửa danh mục thành công", {
                    position: "bottom-center",
                });
            } else {
                throw new Error(data.message);
            }
        } catch (error: any) {
            toast.error("Chỉnh sửa danh mục thất bại", {
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
                                {Boolean(categoryValue) ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
                            </ModalHeader>
                            <ModalBody className="pt-0 px-6">
                                <Input
                                    onValueChange={(value) => setCategoryName(value)}
                                    value={categoryName}
                                    placeholder="Tên danh mục"
                                    variant="underlined"
                                />
                            </ModalBody>
                            <ModalFooter className="flex justify-between pb-6">
                                <Button
                                    isLoading={loading}
                                    onClick={handleSubmit}
                                    isDisabled={categoryValue.trim() === categoryName.trim()}
                                    fullWidth
                                    radius="sm"
                                    className="bg-black text-white"
                                >
                                    {Boolean(categoryValue) ? "Chỉnh sửa" : "Thêm mới"}
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
