"use client";
import useLoading from "@/hooks/useLoading";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Image,
    ButtonProps,
    ModalFooter,
} from "@nextui-org/react";
import React from "react";

import { IoIosWarning } from "react-icons/io";
import { toast } from "sonner";

interface IProps {
    buttonProps?: ButtonProps;
    title?: string;
    description?: string;
    onDelete: () => Promise<void>;
}

export default function DeleteConfirmationButton({
    buttonProps,
    description = "Dữ liệu sẽ bị xóa bỏ, bạn đồng ý chứ?",
    title = "Xác nhận xóa",
    onDelete,
}: IProps): React.ReactNode {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { loading, startLoading, stopLoading } = useLoading();
    return (
        <>
            <Button
                size={buttonProps?.size}
                onPress={onOpen}
                type="button"
                as="button"
                variant={buttonProps?.variant}
                color={buttonProps?.color}
                radius={buttonProps?.radius}
                className={buttonProps?.className}
            >
                {buttonProps?.children}
            </Button>

            <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader></ModalHeader>
                            <ModalBody className="pt-0 px-6 pb-6">
                                <div className="flex flex-col items-center">
                                    <div className="bg-[#fdd0df] p-4 rounded-full">
                                        <IoIosWarning className="text-[#f31260] text-3xl" />
                                    </div>
                                    <h4 className="my-3 text-xl font-bold">
                                        {title}
                                    </h4>
                                    <p>{description}</p>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-between">
                                <Button
                                    fullWidth
                                    color="default"
                                    radius="full"
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    isLoading={loading}
                                    fullWidth
                                    color="danger"
                                    radius="full"
                                    onPress={async () => {
                                        startLoading();
                                        await onDelete();
                                        stopLoading();
                                        onClose();
                                    }}
                                >
                                    Xóa
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
