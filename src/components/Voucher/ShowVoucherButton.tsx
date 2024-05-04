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

import useCurrentUser from "@/hooks/useCurrentUser";
import { fetchData } from "@/lib/utils";
import { IVoucher } from "@/types/voucher";
import useSWR from "swr";
import VoucherItem from "./VoucherItem";

interface IProps {
    buttonProps?: ButtonProps;
}

export default function ShowVoucherButton({ buttonProps }: IProps): React.ReactNode {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { currentUser } = useCurrentUser();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/voucher/user/${currentUser?.id}`;
    const { data: voucherData, isLoading, error } = useSWR(currentUser ? url : null);
    const vouchers: IVoucher[] = voucherData?.data || [];

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
                            <ModalHeader className="flex flex-col gap-1">Các khuyến mãi</ModalHeader>
                            <ModalBody className="pt-0 px-6 pb-6">
                                {vouchers.length > 0 ? (
                                    vouchers.map((voucher) => (
                                        <div key={voucher.id} className="mb-4 last:mb-0">
                                            <VoucherItem isApplyButton voucher={voucher} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center flex-col">
                                        <p className="mt-1 text-gray-500 text-lg">Bạn chưa có khuyến mãi</p>
                                    </div>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
