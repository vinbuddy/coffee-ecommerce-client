"use client";
import useLoading from "@/hooks/useLoading";
import { fetchData, formatVNCurrency } from "@/lib/utils";
import { IProductSize, IProductTopping } from "@/types/product";
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Skeleton,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface IProps {
    onDone?: () => void;
    productId?: number;
}

export default function AddToCartForm({ productId }: IProps): React.ReactNode {
    const [quantity, setQuantity] = useState<number>(1);
    const [sizes, setSizes] = useState<IProductSize[]>([]);
    const [toppings, setToppings] = useState<IProductTopping[]>([]);
    const { loading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        (async () => {
            try {
                startLoading();
                let [toppingData, sizeData] = await Promise.all([
                    fetchData(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/product-toppings/${productId}`
                    ),
                    fetchData(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/product-sizes/${productId}`
                    ),
                ]);

                setToppings(toppingData.data);
                setSizes(sizeData.data);
            } catch (error) {
                console.log("error: ", error);
            } finally {
                stopLoading();
            }
        })();
    }, []);

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
                <RadioGroup
                    label={sizes.length > 0 ? "Chọn size" : null}
                    defaultValue="size-s"
                >
                    {sizes.map((size) => (
                        <Radio key={size?.id} value={size?.id?.toString()}>
                            {size?.size_name} +{" "}
                            {formatVNCurrency(size.size_price)}
                        </Radio>
                    ))}
                </RadioGroup>
                {loading && (
                    <div>
                        <Skeleton className="h-5 w-1/2 rounded-xl mb-2" />
                        <Skeleton className="h-5 w-1/2 rounded-xl mb-2" />
                    </div>
                )}
            </div>
            <div className="mt-5">
                <CheckboxGroup
                    color="primary"
                    label={sizes.length > 0 ? "Chọn topping" : null}
                    defaultValue={[]}
                >
                    {toppings.map((topping) => (
                        <Checkbox
                            key={topping?.id}
                            value={topping?.id.toString()}
                        >
                            {topping.topping_name} +{" "}
                            {formatVNCurrency(topping.topping_price)}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
                {loading && (
                    <div>
                        <Skeleton className="h-5 w-1/2 rounded-xl mb-2" />
                        <Skeleton className="h-5 w-1/2 rounded-xl mb-2" />
                    </div>
                )}
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
