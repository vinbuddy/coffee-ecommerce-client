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
import { ICart } from "@/types/cart";
import EditCartForm from "./EditCartForm";

interface IDefaultProps {
    buttonProps?: ButtonProps;
}

interface IProductInfo extends IDefaultProps {
    product: IProduct;
    cartItem?: never;
}

interface ICartItemInfo extends IDefaultProps {
    product?: never;
    cartItem: ICart;
}

type IProps = ICartItemInfo | IProductInfo;

export default function AddToCartPreviewButton({ buttonProps, product, cartItem }: IProps): React.ReactNode {
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
                            <ModalHeader className="flex flex-col gap-1">
                                {product ? "Thêm vào giỏ hàng" : "Chỉnh sửa giỏ hàng"}
                            </ModalHeader>
                            <ModalBody className="pt-0 px-6 pb-6">
                                <div className="h-[80px] flex bg-[#F4F4F5] rounded-xl p-2.5">
                                    <div className="flex-1 h-full flex justify-between">
                                        <Image
                                            className="h-full border object-cover"
                                            src={product ? product.image : cartItem.product_image}
                                            alt=""
                                        />

                                        <div className="flex-1 ms-3 ">
                                            <p className="font-medium mb-1">
                                                {product ? product?.name : cartItem.product_name}
                                            </p>
                                            <span className="text-gray-500 ">
                                                {formatVNCurrency(product ? product.price : cartItem.product_price)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {product && !product.status && (
                                    <Button fullWidth isDisabled>
                                        Sản phẩm đã hết
                                    </Button>
                                )}
                                {product && product.status && (
                                    <AddToCartForm product={product} onDone={() => onClose()} />
                                )}
                                {!product && <EditCartForm cartItem={cartItem} onDone={() => onClose()} />}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
