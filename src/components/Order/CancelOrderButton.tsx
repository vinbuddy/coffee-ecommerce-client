"use client";
import { useCurrentOrderStore } from "@/hooks";
import DeleteConfirmationButton from "../UI/DeleteConfirmationButton";

interface IProps {
    onAfterCanceled: () => void | Promise<void>;
    isFullWidth?: boolean;
    orderId: string | undefined;
}

export default function CancelOrderButton({ onAfterCanceled, isFullWidth = false, orderId }: IProps) {
    const { completeOrder } = useCurrentOrderStore();

    const handleCancelOrder = async () => {
        try {
            if (!orderId) return;
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/edit-status/${orderId}`, {
                method: "PUT",
                body: JSON.stringify({ order_status: "Đã hủy" }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resData = await response.json();
            if (response.status == 200) {
                completeOrder(orderId);
                onAfterCanceled();
            } else {
                throw new Error(resData.message);
            }
        } catch (error) {
            console.error("Error canceling order: ", error);
        }
    };

    return (
        <>
            <DeleteConfirmationButton
                title="Hủy đơn hàng"
                description="Đơn hàng sẽ bị hủy, bạn đồng ý chứ?"
                buttonProps={{
                    color: "danger",
                    radius: "md",
                    variant: "flat",
                    fullWidth: true,
                    children: "Hủy đơn hàng",
                }}
                deleteButtonContent="Hủy đơn hàng"
                modalBackdrop="blur"
                onDelete={handleCancelOrder}
            />
        </>
    );
}
