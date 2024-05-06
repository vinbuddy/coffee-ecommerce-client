"use client";
import useCurrentOrderStore from "@/hooks/useCurrentOrderStore";
import { Button } from "@nextui-org/react";

interface IProps {
    onAfterCompleted: () => void | Promise<void>;
    isFullWidth?: boolean;
    orderId: string | undefined;
}

export default function CompleteOrderButton({ onAfterCompleted, isFullWidth = false, orderId }: IProps) {
    const { completeOrder } = useCurrentOrderStore();

    const handleCompleteOrder = async () => {
        try {
            if (!orderId) return;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/edit-status/${orderId}`, {
                method: "PUT",
                body: JSON.stringify({ order_status: "Hoàn thành" }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resData = await response.json();

            if (response.status == 200) {
                completeOrder(orderId);
                onAfterCompleted();
            } else {
                throw new Error(resData.message);
            }
        } catch (error) {
            console.error("Error canceling order: ", error);
        }
    };

    return (
        <Button fullWidth={isFullWidth} color="success" radius="md" variant="flat" onClick={handleCompleteOrder}>
            Hủy đơn hàng
        </Button>
    );
}
