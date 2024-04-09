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
import { IProduct } from "@/types/product";
import { formatVNCurrency } from "@/lib/utils";

interface IProps {
    buttonProps?: ButtonProps;
    product: IProduct;
}

export default function AddToCartPreviewButton({
    buttonProps,
    product,
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
                                            src={product?.image || ""}
                                            alt=""
                                        />

                                        <div className="flex-1 ms-3 ">
                                            <p className="font-medium mb-1">
                                                {product?.name}
                                            </p>
                                            <span className="text-gray-500 ">
                                                {formatVNCurrency(
                                                    product?.price
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <AddToCartForm productId={product.id} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
