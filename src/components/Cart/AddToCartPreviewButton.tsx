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
import AddToCartForm from "./AddToCartForm";

interface IProps {
    buttonProps?: ButtonProps;
}

export default function AddToCartPreviewButton({
    buttonProps,
}: IProps): React.ReactNode {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                            <ModalHeader className="flex flex-col gap-1">
                                Thêm vào giỏ hàng
                            </ModalHeader>
                            <ModalBody className="pt-0 px-6 pb-6">
                                <div className="h-[80px] flex bg-[#F4F4F5] rounded-xl p-2.5">
                                    <div className="flex-1 h-full flex justify-between">
                                        <Image
                                            className="h-full border object-cover"
                                            src="https://product.hstatic.net/1000075078/product/1697442235_cloudfee-hanh-nhan-nuong_8282f6c2cf4d49bba2dfbe70cb7dbede_large.jpg"
                                            alt=""
                                        />

                                        <div className="flex-1 ms-3 ">
                                            <p className="font-medium mb-1">
                                                CloudFee Hạnh Nhân Nướng
                                            </p>
                                            <span className="text-gray-500 ">
                                                49.000 đ
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <AddToCartForm />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
