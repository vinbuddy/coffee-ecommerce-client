"use client";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { toast } from "sonner";
import { Button, Checkbox, CheckboxGroup, Radio, RadioGroup, Skeleton } from "@nextui-org/react";

import useCartStore from "@/hooks/useCartStore";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoading from "@/hooks/useLoading";

import { fetchData, formatVNCurrency } from "@/lib/utils";
import { IProduct, IProductSize, IProductTopping } from "@/types/product";

interface IProps {
    onDone?: () => void;
    product: IProduct;
}

export default function AddToCartForm({ product, onDone = () => {} }: IProps): React.ReactNode {
    const [sizes, setSizes] = useState<IProductSize[]>([]);
    const [toppings, setToppings] = useState<IProductTopping[]>([]);

    const { loading, startLoading, stopLoading } = useLoading();
    const { loading: submitLoading, startLoading: startSubmitLoading, stopLoading: stopSubmitLoading } = useLoading();

    const [quantity, setQuantity] = useState<number>(1);
    const [selectedToppings, setSelectedToppings] = useState<number[]>([]);
    const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
    const [previewPrice, setPreviewPrice] = useState<number | string>(0);

    const { currentUser } = useCurrentUser();

    useEffect(() => {
        (async () => {
            try {
                startLoading();
                let [toppingData, sizeData] = await Promise.all([
                    fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/product-toppings/${product.id}`),
                    fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/product-sizes/${product.id}`),
                ]);

                setToppings(toppingData.data);
                setSizes(sizeData.data);
                setSelectedSizeId(sizeData.data[0]?.size_id);

                // Preview Price = product.price + first size price
                if (sizeData.data[0]?.size_price) {
                    const initPreviewPrice: number = Number(product.price) + Number(sizeData.data[0]?.size_price);

                    setPreviewPrice(initPreviewPrice);
                } else {
                    setPreviewPrice(Number(product.price));
                }
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

    const handleSelectToppings = (toppingIds: any): void => {
        setSelectedToppings(toppingIds);
    };

    const handleSelectSize = (sizeId: string): void => {
        setSelectedSizeId(Number(sizeId));
    };

    // Calculcate preview price
    useEffect(() => {
        handlePreviewPrice();
    }, [selectedSizeId, selectedToppings, quantity]);

    const handlePreviewPrice = (): void => {
        let totalPrice: number = Number(product.price);

        // Calculate size price
        const selectedSize = sizes.find((size) => size.size_id === selectedSizeId);

        if (selectedSize && selectedSize.size_price) {
            totalPrice += Number(selectedSize.size_price);
        }

        // Calculate toppings price
        selectedToppings.forEach((toppingId) => {
            const selectedTopping = toppings.find((topping) => topping.id === Number(toppingId));

            if (selectedTopping && selectedTopping.topping_price) {
                totalPrice += Number(selectedTopping.topping_price);
            }
        });

        totalPrice *= quantity;

        setPreviewPrice(totalPrice);
    };

    const addToCart = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            startSubmitLoading();

            const body = {
                user_id: currentUser?.id,
                product_id: product.id,
                size_id: selectedSizeId,
                quantity: quantity,
                toppings: selectedToppings,
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resData = await response.json();

            if (response.status === 200) {
                useCartStore.setState((state) => ({
                    totalItem: state.totalItem + 1,
                }));

                toast.success("Thêm giỏ hàng thành công", {
                    position: "bottom-center",
                });
            } else {
                throw new Error(resData.message);
            }
        } catch (error: any) {
            toast.error("Thêm giỏ hàng thất bại", {
                position: "bottom-center",
            });
        } finally {
            stopSubmitLoading();
            onDone();
        }
    };

    return (
        <form onSubmit={addToCart}>
            {/* Size - Topping */}
            <div>
                {sizes.length > 0 && (
                    <RadioGroup
                        label={sizes.length > 0 ? "Chọn size" : null}
                        defaultValue={selectedSizeId?.toString() || ""}
                        onValueChange={handleSelectSize}
                    >
                        {sizes.map((size) => (
                            <Radio key={size?.size_id} value={size?.size_id?.toString()}>
                                {size?.size_name} + {formatVNCurrency(size.size_price)}
                            </Radio>
                        ))}
                    </RadioGroup>
                )}
                {loading && (
                    <div>
                        <Skeleton className="h-5 w-1/2 rounded-xl mb-2" />
                        <Skeleton className="h-5 w-1/2 rounded-xl mb-2" />
                    </div>
                )}
            </div>
            <div>
                {toppings.length > 0 && (
                    <div className="mt-5">
                        <CheckboxGroup
                            color="primary"
                            label={toppings.length > 0 ? "Chọn topping" : null}
                            defaultValue={[]}
                            onChange={handleSelectToppings}
                        >
                            {toppings.map((topping) => (
                                <Checkbox key={topping?.id} value={topping?.id.toString()}>
                                    {topping.topping_name} + {formatVNCurrency(topping.topping_price)}
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
                        <Button className="border-0 w-[50px] h-[35px] min-w-0 px-0 bg-transparent">{quantity}</Button>
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

                    <Button isLoading={submitLoading} type="submit" className="w-full ms-3" color="primary">
                        {formatVNCurrency(previewPrice)} &#x2022; Thêm vào giỏ hàng
                    </Button>
                </div>
            </div>
        </form>
    );
}
