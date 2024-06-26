import { PaymentMethodType } from ".";
import { ICart } from "./cart";

export interface IOrder {
    id: string;
    user_id: string;
    total_payment: number | string;
    payment_method: PaymentMethodType;
    order_status: "Hoàn thành" | "Đang giao" | "Đã hủy" | "Đang xử lý" | "Đang chờ";
    order_type: "online" | "offline";
    order_date: string;
    order_note: string;
    shipping_cost: number | string;
    receiver_name: string;
    phone_number: string;
    address: string;
    store_id: number | string;
    voucher_id: number | string;
    voucher_name?: string;
    store_name?: string;
    order_items: ICart[];
    is_reviewed?: boolean;
}

export interface IOrderInfo extends IOrder {
    user_name: string;
    email: string;
    password: string | null;
    role_id: number;
    account_type: string;
    avatar: string | null;
}

export interface IOrderStatus {
    status: string;
    time: string;
}

export interface ICurrentOrder {
    orderId: string;
    userId: string;
    statuses: IOrderStatus[];
    isCompleted: boolean;
}

export interface IFirebaseOrder {
    orderId: string;
    userId: string;
    statuses: {
        [key: string]: IOrderStatus;
    };
    isCompleted: boolean;
}
