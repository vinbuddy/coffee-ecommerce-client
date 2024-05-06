"use client";
import {
    Badge,
    Button,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tooltip,
    useDisclosure,
} from "@nextui-org/react";
import OrderStatusProgress from "./OrderStatusProgress";
import { MdDeliveryDining } from "react-icons/md";

export default function OrderStatusWidget() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <>
            <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Trạng thái đơn hàng</ModalHeader>
                            <ModalBody className="pt-0 px-6">
                                <OrderStatusProgress />
                            </ModalBody>
                            <ModalFooter className="flex justify-between pb-6">
                                <Button fullWidth color="danger" radius="md" variant="flat" onPress={onClose}>
                                    Hủy đơn hàng
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Tooltip content="Đơn hàng đang giao" placement="bottom">
                <button onClick={onOpen} className="text-sm">
                    <Badge content="" color="warning" shape="circle" placement="top-right">
                        <MdDeliveryDining size={28} />
                    </Badge>
                </button>
            </Tooltip>
        </>
    );
}
