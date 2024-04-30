import { PaymentMethodType } from ".";
import { ICart } from "./cart";

export interface IOrder {
    id: string;
    user_id: string;
    total_payment: number | string;
    payment_method: PaymentMethodType;
    order_status: string;
    order_type: "online" | "offline";
    order_date: string;
    order_note: string | Date;
    shipping_cost: number | string;
    receiver_name: string;
    phone_number: string;
    address: string;
    store_id: number | string;
    voucher_id: number | string;
    order_items: ICart[];
}
