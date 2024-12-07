"use client";
import { Checkbox, Chip, Image, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { mutate } from "swr";
import { toast } from "sonner";

import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDraw } from "react-icons/md";
import AddToCartPreviewButton from "./AddToCartPreviewButton";
import DeleteConfirmationButton from "../UI/DeleteConfirmationButton";
import { formatVNCurrency } from "@/lib/utils";
import { ICart } from "@/types";
import { useCurrentUser, useCartStore } from "@/hooks";

interface IProps {
    cartItem: ICart;
    isSelected?: boolean;
    isDeleted?: boolean;
    isEdited?: boolean;
    isProductLink?: boolean;
}

export default function CartItem({
    isSelected = true,
    isDeleted = true,
    isEdited = true,
    isProductLink = true,
    cartItem,
}: IProps): React.ReactNode {
    const { currentUser } = useCurrentUser();
    const { addSelectedCartItems, removeSelectedCartItems } = useCartStore();
    const handleDeleteCartItem = async (): Promise<void> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/${cartItem.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resData = await response.json();

            if (response.status === 200) {
                // Mutate Cart page

                mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/${currentUser?.id}`);

                // Update cart badge
                useCartStore.setState((state) => ({
                    totalItem: state.totalItem - 1,
                }));

                toast.success("Xóa giỏ hàng thành công", {
                    position: "bottom-center",
                });
            } else {
                throw new Error(resData.message);
            }
        } catch (error) {
            toast.error("Xóa giỏ hàng thất bại", {
                position: "bottom-center",
            });
        }
    };

    const handleSelectCartItem = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let isChecked = e.target.checked;

        if (isChecked) {
            addSelectedCartItems(cartItem);
        } else {
            removeSelectedCartItems(cartItem);
        }
    };

    return (
        <li className="flex items-start overflow-hidden mb-7 last:mb-0">
            {isSelected && (
                <Checkbox
                    isDisabled={!cartItem?.product_status}
                    className="me-1.5 hidden md:block"
                    size="lg"
                    radius="full"
                    value={cartItem?.id.toString()}
                    onChange={handleSelectCartItem}
                ></Checkbox>
            )}

            <div className="flex flex-col sm:hidden items-center justify-center">
                {isDeleted && isEdited && !cartItem?.product_status && (
                    <Chip size="sm" color="danger" variant="faded">
                        Sản phẩm đã hết
                    </Chip>
                )}
                {isEdited && cartItem?.product_status && (
                    <AddToCartPreviewButton
                        cartItem={cartItem}
                        buttonProps={{
                            color: "default",
                            variant: "light",
                            size: "md",
                            radius: "full",
                            className: "w-[30px] h-[30px] px-2 min-w-0",
                            children: <MdOutlineDraw className="text-lg" />,
                        }}
                    />
                )}
                {isDeleted && (
                    <DeleteConfirmationButton
                        onDelete={handleDeleteCartItem}
                        buttonProps={{
                            color: "danger",
                            variant: "light",
                            radius: "full",
                            size: "md",
                            className: "w-[30px] h-[30px] px-2 min-w-0 mt-3",
                            children: <AiOutlineDelete className="text-lg" />,
                        }}
                    />
                )}
            </div>

            <div className="flex-1 h-full flex justify-between">
                {isProductLink ? (
                    <div className="relative">
                        <Link href={`/product/${cartItem.product_id}`} className="w-[100px] block h-auto">
                            <Image
                                removeWrapper
                                className="h-full border object-cover"
                                src={cartItem?.product_image || ""}
                                alt=""
                            />
                        </Link>

                        {isSelected && (
                            <Checkbox
                                isDisabled={!cartItem?.product_status}
                                className="me-1.5 z-10 absolute top-3 left-3 md:hidden"
                                classNames={{
                                    wrapper: "bg-white",
                                }}
                                size="lg"
                                radius="full"
                                value={cartItem?.id.toString()}
                                onChange={handleSelectCartItem}
                            ></Checkbox>
                        )}
                    </div>
                ) : (
                    <Image className="w-[100px] border object-cover" src={cartItem?.product_image || ""} alt="" />
                )}

                <div className="flex-1 ms-4 overflow-hidden">
                    <div className="flex items-center justify-between overflow-hidden">
                        <p className="font-medium mb-2 truncate max-w-[80%]">{cartItem?.product_name}</p>
                        <div className="hidden sm:flex items-center">
                            {isDeleted && isEdited && !cartItem?.product_status && (
                                <Chip size="sm" color="danger" variant="faded">
                                    Sản phẩm đã hết
                                </Chip>
                            )}
                            {isEdited && cartItem?.product_status && (
                                <AddToCartPreviewButton
                                    cartItem={cartItem}
                                    buttonProps={{
                                        color: "default",
                                        variant: "light",
                                        size: "md",
                                        radius: "full",
                                        className: "w-[30px] h-[30px] px-0 min-w-0",
                                        children: <MdOutlineDraw className="text-lg" />,
                                    }}
                                />
                            )}
                            {isDeleted && (
                                <DeleteConfirmationButton
                                    onDelete={handleDeleteCartItem}
                                    buttonProps={{
                                        color: "danger",
                                        variant: "light",
                                        radius: "full",
                                        size: "md",
                                        className: "w-[30px] h-[30px] px-0 min-w-0 ms-2",
                                        children: <AiOutlineDelete className="text-lg" />,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between ">
                        <p className="text-gray-500 mb-2">{formatVNCurrency(cartItem.product_price)}</p>
                        <p className="hidden md:block text-gray-500 mb-2">
                            Tổng: {formatVNCurrency(cartItem.order_item_price)}
                        </p>
                    </div>
                    <p className="text-gray-500 mb-2">
                        +{cartItem.quantity} {cartItem?.size_name && `,size ${cartItem?.size_name.toLowerCase()}`}
                    </p>
                    {cartItem.toppings && cartItem.toppings.length > 0 && (
                        <div className="flex gap-x-2">
                            <p className="text-gray-500 mb-2">Topping: </p>
                            {cartItem.toppings.map((topping) => (
                                <Tooltip
                                    key={topping.topping_storage_id}
                                    closeDelay={0}
                                    content={topping.topping_price}
                                    placement="bottom"
                                >
                                    <Chip className="cursor-pointer" size="sm" color="default" variant="flat">
                                        {topping.topping_name}
                                    </Chip>
                                </Tooltip>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
}
