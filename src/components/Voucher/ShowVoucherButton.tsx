"use client";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Image,
    ButtonProps,
} from "@nextui-org/react";
import { AiOutlinePlus } from "react-icons/ai";
import { formatVNCurrency } from "@/lib/utils";
import VoucherItem from "./VoucherItem";

interface IProps {
    buttonProps?: ButtonProps;
}

export default function ShowVoucherButton({ buttonProps }: IProps): React.ReactNode {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Các khuyến mãi</ModalHeader>
                            <ModalBody className="pt-0 px-6 pb-6">
                                <VoucherItem />
                                <VoucherItem />
                                <VoucherItem />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
