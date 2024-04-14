"use client";
import { Checkbox, Chip, Image, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDraw } from "react-icons/md";
import AddToCartPreviewButton from "./AddToCartPreviewButton";
import { ICart } from "@/types/cart";
import { formatVNCurrency } from "@/lib/utils";
import DeleteConfirmationButton from "../UI/DeleteConfirmationButton";
import { mutate } from "swr";
import useCurrentUser from "@/hooks/useCurrentUser";
import { toast } from "sonner";
import useCartStore from "@/hooks/useCartStore";

interface IProps {
    cartItem: ICart;
    isSelected?: boolean;
    isDeleted?: boolean;
    isEdited?: boolean;
}

export default function CartItem({
    isSelected = true,
    isDeleted = true,
    isEdited = true,
    cartItem,
}: IProps): React.ReactNode {
    const { currentUser } = useCurrentUser();
    const { addSelectedCartItems, removeSelectedCartItems } = useCartStore();
    const handleDeleteCartItem = async (): Promise<void> => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/${cartItem.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const resData = await response.json();

            if (response.status === 200) {
                // Mutate Cart page

                mutate(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/${currentUser?.id}`
                );

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

    const handleSelectCartItem = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        let isChecked = e.target.checked;

        if (isChecked) {
            addSelectedCartItems(cartItem);
        } else {
            removeSelectedCartItems(cartItem);
        }
    };

    return (
        <li className="flex items-start h-[140px] mb-5 last:mb-0">
            {isSelected && (
                <Checkbox
                    className="me-1.5"
                    size="lg"
                    radius="full"
                    value={cartItem?.id.toString()}
                    onChange={handleSelectCartItem}
                ></Checkbox>
            )}

            <div className="flex-1 h-full flex justify-between ">
                <Image
                    className="h-full border object-cover"
                    src={cartItem?.product_image || ""}
                    alt=""
                />

                <div className="flex-1 ms-4">
                    <div className="flex items-center justify-between">
                        <p className="font-medium mb-2">
                            {cartItem?.product_name}
                        </p>
                        <div className="flex items-center">
                            {isEdited && (
                                <AddToCartPreviewButton
                                    cartItem={cartItem}
                                    buttonProps={{
                                        color: "default",
                                        variant: "light",
                                        size: "md",
                                        radius: "full",
                                        className:
                                            "w-[30px] h-[30px] px-0 min-w-0",
                                        children: (
                                            <MdOutlineDraw className="text-lg" />
                                        ),
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
                                        className:
                                            "w-[30px] h-[30px] px-0 min-w-0 ms-2",
                                        children: (
                                            <AiOutlineDelete className="text-lg" />
                                        ),
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 mb-2">
                            {formatVNCurrency(cartItem.product_price)}
                        </p>
                        <p className="text-gray-500 mb-2">
                            Tổng: {formatVNCurrency(cartItem.total_item_price)}
                        </p>
                    </div>
                    <p className="text-gray-500 mb-2">
                        +{cartItem.quantity}, size{" "}
                        {cartItem.size_name.toLowerCase()}
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
                                    <Chip
                                        className="cursor-pointer"
                                        color="default"
                                        variant="flat"
                                    >
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
