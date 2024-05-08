import { formatDateTime, formatVNCurrency, getOrderStatusColor } from "@/lib/utils";
import { IOrder } from "@/types/order";
import { Chip } from "@nextui-org/react";
import CartItem from "../Cart/CartItem";
import Link from "next/link";

interface IProps {
    order: IOrder;
}

export default function OrderCard({ order }: IProps) {
    return (
        <div>
            <Link href={`/profile/order/${order.id}`}>
                <header className="flex items-center justify-between py-4 border-b border-dashed">
                    <p>
                        Ngày đặt hàng:{" "}
                        <span className="text-black/55 font-medium">{formatDateTime(order?.order_date)}</span>
                    </p>

                    <Chip color={getOrderStatusColor(order?.order_status)} variant="flat">
                        {order?.order_status}
                    </Chip>
                </header>
                <ul className="py-5">
                    {order.order_items.map((item) => (
                        <CartItem isSelected={false} isDeleted={false} isEdited={false} cartItem={item} key={item.id} />
                    ))}
                </ul>
            </Link>

            <footer className="py-4 border-t border-dashed">
                <div className="flex justify-end">
                    <div className="flex items-center">
                        <span>Thành tiền: &nbsp;</span>
                        <span className="text-primary">{formatVNCurrency(order?.total_payment || 0)}</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
