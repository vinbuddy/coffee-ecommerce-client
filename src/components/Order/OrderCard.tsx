import { formatDateTime, formatVNCurrency, getOrderStatusColor } from "@/lib/utils";
import { IOrder } from "@/types/order";
import { Button, Chip } from "@nextui-org/react";
import CartItem from "../Cart/CartItem";
import Link from "next/link";

interface IProps {
    order: IOrder;
    isShowReview?: boolean;
}

export default function OrderCard({ order, isShowReview = true }: IProps) {
    return (
        <div>
            {!isShowReview ? (
                <div>
                    <header className="flex items-center flex-wrap justify-between py-4 border-b border-dashed">
                        <p className="w-full sm:w-auto">
                            Ngày đặt hàng:{" "}
                            <span className="text-black/55 font-medium">{formatDateTime(order?.order_date)}</span>
                        </p>

                        <div className="w-full mt-2 sm:mt-0 sm:w-auto">
                            <Chip color={getOrderStatusColor(order?.order_status)} variant="flat">
                                {order?.order_status}
                            </Chip>
                        </div>
                    </header>
                    <ul className="py-5">
                        {order.order_items.map((item) => (
                            <CartItem
                                isSelected={false}
                                isDeleted={false}
                                isEdited={false}
                                cartItem={item}
                                isProductLink={true}
                                key={item.id}
                            />
                        ))}
                    </ul>
                </div>
            ) : (
                <Link href={`/profile/order/${order.id}`}>
                    <header className="flex items-center justify-between flex-wrap py-4 border-b border-dashed">
                        <p className="w-full sm:w-auto">
                            Ngày đặt hàng:{" "}
                            <span className="text-black/55 font-medium">{formatDateTime(order?.order_date)}</span>
                        </p>

                        <div className="w-full mt-2 sm:mt-0 sm:w-auto">
                            <Chip color={getOrderStatusColor(order?.order_status)} variant="flat">
                                {order?.order_status}
                            </Chip>
                        </div>
                    </header>
                    <ul className="py-5">
                        {order.order_items.map((item) => (
                            <CartItem
                                isSelected={false}
                                isDeleted={false}
                                isEdited={false}
                                cartItem={item}
                                isProductLink={false}
                                key={item.id}
                            />
                        ))}
                    </ul>
                </Link>
            )}

            <footer className="flex items-center flex-wrap justify-between py-4 border-t border-dashed">
                <div className="w-full sm:w-auto flex items-center">
                    <span>Thành tiền: &nbsp;</span>
                    <span className="text-primary">{formatVNCurrency(order?.total_payment || 0)}</span>
                </div>
                {isShowReview && order.order_status === "Hoàn thành" && order.is_reviewed === false && (
                    <Button
                        className="mt-3 w-full sm:w-auto sm:mt-0"
                        href={`/profile/order/review/${order.id}`}
                        as={Link}
                        color="primary"
                        radius="full"
                    >
                        Đánh giá
                    </Button>
                )}
            </footer>
        </div>
    );
}
