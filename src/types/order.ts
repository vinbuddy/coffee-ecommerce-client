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
    order_note: string;
    shipping_cost: number | string;
    receiver_name: string;
    phone_number: string;
    address: string;
    store_id: number | string;
    voucher_id: number | string;
    order_items: ICart[];
}

export interface IOrderInfo extends IOrder {
    user_name: string;
    email: string;
    password: string | null;
    role_id: number;
    account_type: string;
    avatar: string | null;
}
