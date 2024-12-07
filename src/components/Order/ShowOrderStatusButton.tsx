"use client";
import {
    Badge,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tooltip,
    useDisclosure,
} from "@nextui-org/react";
import { toast } from "sonner";
import { MdDeliveryDining } from "react-icons/md";

import OrderStatusProgress from "./OrderStatusProgress";
import { getOrderStatusColor } from "@/lib/utils";
import CancelOrderButton from "./CancelOrderButton";
import CompleteOrderButton from "./CompleteOrderButton";
import { useCurrentOrderStore } from "@/hooks";

export default function OrderStatusWidget() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { currentOrder } = useCurrentOrderStore();
    const lastStatus = currentOrder?.statuses[currentOrder?.statuses.length - 1].status;

    const isCancelable = currentOrder?.statuses.length === 1 && lastStatus === "Đang chờ";
    const isCompletable = lastStatus === "Hoàn thành";

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Trạng thái đơn hàng</ModalHeader>
                            <ModalBody className="pt-6 px-6">
                                <OrderStatusProgress />
                            </ModalBody>
                            <ModalFooter className="flex justify-between pb-6">
                                {isCancelable && (
                                    <CancelOrderButton
                                        orderId={currentOrder?.orderId}
                                        isFullWidth
                                        onAfterCanceled={() => {
                                            toast.success("Đã hủy đơn hàng", {
                                                position: "bottom-center",
                                            });
                                            onClose();
                                        }}
                                    />
                                )}
                                {isCompletable ? (
                                    <CompleteOrderButton
                                        orderId={currentOrder?.orderId}
                                        isFullWidth
                                        onAfterCompleted={() => {
                                            toast.success("Đã hoàn thành đơn hàng", {
                                                position: "bottom-center",
                                            });
                                            onClose();
                                        }}
                                    />
                                ) : (
                                    <Button fullWidth isDisabled>
                                        Hoàn thành đơn hàng
                                    </Button>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Tooltip closeDelay={0} content={lastStatus || "Chưa có đơn hàng"} placement="bottom">
                <button onClick={onOpen} className="text-sm">
                    <Badge
                        content=""
                        color={getOrderStatusColor(lastStatus || "Đang chờ")}
                        shape="circle"
                        placement="top-right"
                        isInvisible={!lastStatus}
                    >
                        <MdDeliveryDining size={28} />
                    </Badge>
                </button>
            </Tooltip>
        </>
    );
}
