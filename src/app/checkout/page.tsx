"use client";
import CartItem from "@/components/Cart/CartItem";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import {
    Image,
    Input,
    Radio,
    RadioGroup,
    cn,
    Autocomplete,
    AutocompleteItem,
    Button,
} from "@nextui-org/react";
import React from "react";
import moneyIcon from "@/assets/images/money-icon.png";
import momoIcon from "@/assets/images/momo-icon.png";

import { MdLocationSearching } from "react-icons/md";

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/",
    },
    {
        content: "Thanh toán",
        href: "/checkout",
    },
];

const locations: any = [
    {
        label: "Cat",
        value: "cat",
        description: "The second most popular pet in the world",
    },
    {
        label: "Dog",
        value: "dog",
        description: "The most popular pet in the world",
    },
    {
        label: "Elephant",
        value: "elephant",
        description: "The largest land animal",
    },
    { label: "Lion", value: "lion", description: "The king of the jungle" },
    { label: "Tiger", value: "tiger", description: "The largest cat species" },
    {
        label: "Giraffe",
        value: "giraffe",
        description: "The tallest land animal",
    },
    {
        label: "Dolphin",
        value: "dolphin",
        description:
            "A widely distributed and diverse group of aquatic mammals",
    },
    {
        label: "Penguin",
        value: "penguin",
        description: "A group of aquatic flightless birds",
    },
    {
        label: "Zebra",
        value: "zebra",
        description: "A several species of African equids",
    },
    {
        label: "Shark",
        value: "shark",
        description:
            "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    },
    {
        label: "Whale",
        value: "whale",
        description: "Diverse group of fully aquatic placental marine mammals",
    },
    {
        label: "Otter",
        value: "otter",
        description: "A carnivorous mammal in the subfamily Lutrinae",
    },
    {
        label: "Crocodile",
        value: "crocodile",
        description: "A large semiaquatic reptile",
    },
];

const PaymentMethodRadio = (props: any): React.ReactNode => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-default"
                ),
            }}
        >
            {children}
        </Radio>
    );
};

export default function CheckoutPage(): React.ReactNode {
    return (
        <div className="container pb-10 min-h-[400px]">
            <div className="px-6 h-full">
                <div className="mb-10">
                    <Breadcrumbs breadcumbItems={breadcumbItems} />
                </div>

                <form>
                    <div className="grid grid-cols-12 h-full gap-10">
                        {/* Shipping - Payment method */}
                        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                            <section>
                                <h2 className="font-medium text-lg">
                                    Thông tin giao hàng
                                </h2>

                                <div className="mt-4 grid grid-cols-12 gap-5">
                                    <Autocomplete
                                        isRequired
                                        defaultItems={locations}
                                        labelPlacement="inside"
                                        label="Địa chỉ giao hàng"
                                        className="col-span-12"
                                        selectorIcon={<MdLocationSearching />}
                                    >
                                        {(item: any) => (
                                            <AutocompleteItem key={item.value}>
                                                {item.label}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                    <Input
                                        isRequired
                                        className="col-span-6"
                                        type="text"
                                        label="Tên người nhận"
                                    />
                                    <Input
                                        isRequired
                                        className="col-span-6"
                                        type="text"
                                        label="Số điện thoại"
                                    />
                                    <Input
                                        className="col-span-12"
                                        type="text"
                                        label="Ghi chú cho đơn hàng"
                                    />
                                </div>
                            </section>

                            <section className="mt-10">
                                <h2 className="font-medium text-lg">
                                    Phương thức thanh toán
                                </h2>

                                <div className="mt-4">
                                    <RadioGroup
                                        color="default"
                                        defaultValue="money"
                                    >
                                        <PaymentMethodRadio value="money">
                                            <div className="flex items-center">
                                                <Image
                                                    width={24}
                                                    src={moneyIcon.src}
                                                    alt="money icon"
                                                />
                                                <span className="ms-3">
                                                    Tiền mặt
                                                </span>
                                            </div>
                                        </PaymentMethodRadio>
                                        <PaymentMethodRadio value="mommo">
                                            <div className="flex items-center">
                                                <Image
                                                    width={24}
                                                    src={momoIcon.src}
                                                    alt="money icon"
                                                    radius="none"
                                                />
                                                <span className="ms-3">
                                                    Momo
                                                </span>
                                            </div>
                                        </PaymentMethodRadio>
                                    </RadioGroup>
                                </div>
                            </section>
                        </div>

                        {/* Summary */}
                        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                            <div className="shadow-lg border rounded-xl">
                                <div className="p-4 ">
                                    <section>
                                        <h2 className="font-medium text-lg">
                                            Các món đã chọn
                                        </h2>

                                        <ul className="mt-4">
                                            <CartItem
                                                isSelected={false}
                                                isDeleted={false}
                                                isEdited={false}
                                                cartItem={{}}
                                            />
                                            <CartItem
                                                isSelected={false}
                                                isDeleted={false}
                                                isEdited={false}
                                                cartItem={{}}
                                            />
                                        </ul>
                                    </section>

                                    <section className="mt-10">
                                        <h2 className="font-medium text-lg">
                                            Tổng cộng
                                        </h2>

                                        <ul className="mt-1">
                                            <li className="flex items-center justify-between py-4 border-b">
                                                <span className="text-sm">
                                                    Thành tiền
                                                </span>
                                                <span>100.000 đ</span>
                                            </li>
                                            <li className="flex items-center justify-between py-4 border-b">
                                                <span className="text-sm">
                                                    Phí giao hàng
                                                </span>
                                                <span>18.000 đ</span>
                                            </li>
                                            <li className="flex items-center justify-between py-4">
                                                <span className="text-sm">
                                                    Khuyến mãi
                                                </span>
                                                <Button
                                                    color="primary"
                                                    variant="flat"
                                                    radius="full"
                                                    size="sm"
                                                >
                                                    Chọn
                                                </Button>
                                            </li>
                                        </ul>
                                    </section>
                                </div>
                                <div className="p-4  flex items-center justify-between bg-[#F4F4F5] ">
                                    <div>
                                        <p>Tổng thanh toán</p>
                                        <p className="text-primary mt-2 text-lg">
                                            120.000 đ
                                        </p>
                                    </div>

                                    <Button color="primary" size="lg">
                                        Đặt hàng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
