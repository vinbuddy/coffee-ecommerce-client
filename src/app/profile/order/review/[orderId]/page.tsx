"use client";
import OrderCard from "@/components/Order/OrderCard";
import StarRating from "@/components/UI/StarRating";
import useLoading from "@/hooks/useLoading";
import { IOrderInfo } from "@/types/order";
import { Button, Card, CardBody, Textarea, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";

export default function CreateReviewPage({ params }: { params: { orderId: string } }) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/${params?.orderId}`;
    const { data: orderData, isLoading, error } = useSWR(url);
    const order: IOrderInfo = orderData?.data;

    const [rating, setRating] = useState<number>(5);
    const [review, setReview] = useState<string>("");

    const { startLoading, stopLoading, loading } = useLoading();
    const router = useRouter();

    useEffect(() => {
        document.title = "Đánh giá đơn hàng";
    }, []);

    const getRatingLabel = useCallback(() => {
        switch (rating) {
            case 1:
                return "Rất tệ";
            case 2:
                return "Tệ";
            case 3:
                return "Bình thường";
            case 4:
                return "Tốt";
            case 5:
                return "Tuyệt vời";
            default:
                return "Tuyệt vời";
        }
    }, [rating]);

    const handleReview = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!order) return;

        try {
            startLoading();
            const data = {
                rating,
                review,
                order_id: order.id,
                user_id: order.user_id,
            };

            // fetch
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const resData = await response.json();

            // check response
            if (response.status === 200) {
                toast.success("Đánh giá của bạn đã được gửi thành công", {
                    position: "bottom-center",
                });
                mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/user-order/${order.id}`);

                router.replace("/profile/order");
            } else {
                throw new Error(resData.message);
            }
        } catch (error: any) {
            toast.error(error.message),
                {
                    position: "bottom-center",
                };
            stopLoading();
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-5">Đánh giá đơn hàng</h3>

            {!isLoading && order && (
                <Card className="px-4">
                    <CardBody>
                        <OrderCard isShowReview={false} order={order} />

                        <form onSubmit={handleReview} className="border-t border-dashed py-5">
                            <div className="flex items-center gap-x-2">
                                <p className="text-sm">Đánh giá chất lượng</p>
                                <Tooltip
                                    content={getRatingLabel()}
                                    placement="right-end"
                                    isOpen={true}
                                    showArrow
                                    color="foreground"
                                >
                                    <div>
                                        <StarRating defaultRating={5} onRating={(rating) => setRating(rating)} />
                                    </div>
                                </Tooltip>
                            </div>
                            <Textarea
                                onValueChange={(value) => setReview(value)}
                                fullWidth
                                isRequired
                                labelPlacement="outside"
                                placeholder="Nhập đánh giá của bạn về đơn hàng, sản phẩm"
                                className="my-5"
                            />
                            <Button isLoading={loading} type="submit" color="primary" fullWidth>
                                Gửi đánh giá
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            )}
        </div>
    );
}
