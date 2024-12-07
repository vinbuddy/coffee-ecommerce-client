import { Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Image, Chip } from "@nextui-org/react";
import React from "react";
import { toast } from "sonner";

import { formatDateTime, formatVNCurrency } from "@/lib/utils";
import { IVoucher, ICart } from "@/types";
import { useCheckoutStore } from "@/hooks";

interface IProps {
    voucher: IVoucher;
    isApplyButton?: boolean;
    onAfterApplied?: () => void;
}

export default function VoucherItem({
    voucher,
    isApplyButton = false,
    onAfterApplied = () => {},
}: IProps): React.ReactNode {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { applyVoucher, storeId } = useCheckoutStore();

    const handleApplyVoucher = () => {
        const applyAll: boolean = true;

        // Check voucher.applicable_products and voucher.applicable_stores
        const cartItemStorage: string | null = localStorage.getItem("cart");
        const selectedCartItems: ICart[] = cartItemStorage ? JSON.parse(cartItemStorage) : [];

        const isApplicableProducts =
            voucher.applicable_products?.every((product) =>
                selectedCartItems.some((item) => item.product_id === product.id)
            ) ?? applyAll;

        const isApplicableStores = voucher.applicable_stores?.some((store) => store.id === storeId) ?? applyAll;
        console.log("storeId: ", storeId);
        console.log("isApplicableStores: ", isApplicableStores);

        if (!storeId && isApplicableStores) {
            toast.error("Hãy chọn cửa hàng để áp dụng khuyến mãi", {
                position: "bottom-center",
            });
            return;
        }

        if (!isApplicableProducts || !isApplicableStores) {
            toast.error("Không thể áp dụng khuyến mãi cho sản phẩm hoặc cửa hàng này", {
                position: "bottom-center",
            });
            return;
        }

        applyVoucher(voucher);
        onClose();
        onAfterApplied();
    };

    return (
        <div className="border flex bg-white shadow-md rounded-xl">
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Chi tiết khuyến mãi</ModalHeader>
                            <ModalBody className="pt-0 px-6 pb-6">
                                <div className="flex flex-col">
                                    <div className="flex">
                                        <Image
                                            className="w-[100px] h-[100px]"
                                            src={voucher?.image}
                                            alt="voucher image"
                                        />
                                        <div className="ms-3">
                                            <h3 className="font-bold mt-2 text-primary/80">{voucher?.voucher_name}</h3>
                                            <p className="my-2 text-sm">
                                                Đơn hàng từ:{" "}
                                                <span className="text-black/70">
                                                    {formatVNCurrency(voucher?.min_order_price)}
                                                </span>
                                            </p>
                                            <p className="my-2 text-sm">
                                                Giảm giá:{" "}
                                                <span className="text-black/70">
                                                    {formatVNCurrency(voucher?.discount_price)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-sm">{voucher.description}</p>

                                    <Chip className="mt-3 mb-2" color="default" variant="flat">
                                        Hết hạn: {formatDateTime(voucher?.end_date)}
                                    </Chip>
                                </div>
                                <div className="border-t border-dashed pt-4">
                                    {voucher.applicable_products.length > 0 && (
                                        <div className="mb-4">
                                            <h3 className="font-medium mb-1">Áp dụng cho sản phẩm</h3>
                                            <ul className="list-disc list-inside">
                                                {voucher.applicable_products.map((product) => (
                                                    <li className="text-sm" key={product.id}>
                                                        {product.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {voucher.applicable_stores.length > 0 && (
                                        <div className="mb-4">
                                            <h3 className="font-medium mb-1">Áp dụng cho cửa hàng</h3>
                                            <ul className="list-disc list-inside">
                                                {voucher.applicable_stores.map((store) => (
                                                    <li className="text-sm" key={store.id}>
                                                        {store.store_name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                {isApplyButton && (
                                    <Button onClick={handleApplyVoucher} color="primary" variant="flat">
                                        Sử dụng
                                    </Button>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="p-4">
                <Image className="w-[100px] h-[100px]" src={voucher?.image} alt="voucher image" />
            </div>
            <div className="relative border-l-4 border-dotted"></div>
            <div className="flex-1 border-dashed p-4">
                <h3 className="font-bold">{voucher.voucher_name}</h3>
                <p className="my-2 text-sm line-clamp-3">{voucher.description}</p>

                <div className="flex items-center">
                    <p onClick={onOpen} className="text-[#0071e3] text-sm me-3 cursor-pointer">
                        Xem chi tiết
                    </p>

                    {isApplyButton && (
                        <Button onClick={handleApplyVoucher} radius="full" size="sm" variant="flat" color="primary">
                            Sử dụng
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
