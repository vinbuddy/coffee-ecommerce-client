"use client";
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
} from "@nextui-org/react";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface IProps {
    onDone?: () => void;
}

export default function AddToCartForm({}: IProps): React.ReactNode {
    const [quantity, setQuantity] = useState<number>(1);
    // const [size, setSize] = useState<string>("small");

    const handleIncrease = (): void => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrease = (): void => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    return (
        <form action="">
            {/* Size - Topping */}
            <div>
                <RadioGroup label="Chọn size" defaultValue="size-s">
                    <Radio value="size-s">Nhỏ + 0 đ</Radio>
                    <Radio value="size-m">Vừa + 10.000 đ</Radio>
                    <Radio value="size-l">Lớn + 16.000 đ</Radio>
                </RadioGroup>
            </div>
            <div className="mt-5">
                <CheckboxGroup
                    color="primary"
                    label="Chọn topping"
                    defaultValue={[]}
                >
                    <Checkbox value="buenos-aires">
                        Trái vải (+10.000 đ)
                    </Checkbox>
                    <Checkbox value="sydney">Đào miếng (+10.000 đ)</Checkbox>
                    <Checkbox value="london">
                        Trân châu trắng (+10.000 đ)
                    </Checkbox>
                </CheckboxGroup>
            </div>

            {/* Select quantity - Add to cart */}
            <div className=" mt-5">
                <p className="font-medium mb-2">Chọn số lượng</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Button
                            isDisabled={quantity === 1}
                            onClick={handleDecrease}
                            color="primary"
                            variant="flat"
                            radius="full"
                            className="border-0 w-[35px] h-[35px] min-w-0 px-0"
                        >
                            <AiOutlineMinus />
                        </Button>
                        <Button className="border-0 w-[50px] h-[35px] min-w-0 px-0 bg-transparent">
                            {quantity}
                        </Button>
                        <Button
                            onClick={handleIncrease}
                            color="primary"
                            variant="flat"
                            radius="full"
                            className="border-0 w-[35px] h-[35px] min-w-0 px-0"
                        >
                            <AiOutlinePlus />
                        </Button>
                    </div>

                    <Button className="w-full ms-3" color="primary">
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            </div>
        </form>
    );
}
