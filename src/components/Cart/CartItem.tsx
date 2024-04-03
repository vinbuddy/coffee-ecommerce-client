import {
    Button,
    Checkbox,
    Chip,
    Image,
    Spacer,
    Tooltip,
    cn,
} from "@nextui-org/react";
import Link from "next/link";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDraw } from "react-icons/md";
import AddToCartPreviewButton from "./AddToCartPreviewButton";

interface IProps {
    cartItem: any;
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
    return (
        <li className="flex items-start h-[140px] mb-5 last:mb-0">
            {isSelected && (
                <Checkbox
                    className="me-1.5"
                    size="lg"
                    radius="full"
                    value={cartItem?.id}
                ></Checkbox>
            )}

            <div className="flex-1 h-full flex justify-between ">
                <Image
                    className="h-full border object-cover"
                    src="https://product.hstatic.net/1000075078/product/1697442235_cloudfee-hanh-nhan-nuong_8282f6c2cf4d49bba2dfbe70cb7dbede_large.jpg"
                    alt=""
                />

                <div className="flex-1 ms-4">
                    <div className="flex items-center justify-between">
                        <p className="font-medium mb-2">
                            CloudFee Hạnh Nhân Nướng
                        </p>
                        <div className="flex items-center">
                            {isEdited && (
                                <AddToCartPreviewButton
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
                                <Button
                                    color="danger"
                                    variant="light"
                                    radius="full"
                                    size="md"
                                    className="w-[30px] h-[30px] px-0 min-w-0 ms-2"
                                    startContent={
                                        <AiOutlineDelete className="text-lg" />
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 mb-2">49.000 đ</p>
                        <p className="text-gray-500 mb-2">Tổng: 49.000 đ</p>
                    </div>
                    <p className="text-gray-500 mb-2">+1, size vừa</p>
                    <div className="flex gap-x-2">
                        <p className="text-gray-500 mb-2">Topping: </p>
                        <Tooltip
                            closeDelay={0}
                            content="+10.000 đ"
                            placement="bottom"
                        >
                            <Chip
                                className="cursor-pointer"
                                color="default"
                                variant="flat"
                            >
                                Trái vải
                            </Chip>
                        </Tooltip>
                        <Tooltip
                            closeDelay={0}
                            content="+10.000 đ"
                            placement="bottom"
                        >
                            <Chip
                                className="cursor-pointer"
                                color="default"
                                variant="flat"
                            >
                                Đào miếng
                            </Chip>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </li>
    );
}
