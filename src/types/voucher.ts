import { IProduct } from "./product";
import { IStore } from "./store";
import { IUser } from "./user";

export interface IVoucher {
    id: number;
    voucher_name: string;
    voucher_type?: string | null;
    description: string;
    start_date: string;
    end_date: string;
    image: string;
    discount_price: string | number;
    discount_type: string;
    applicable_stores: IStore[];
    applicable_products: IProduct[];
    applicable_users: IUser[];
    min_order_price: string | number;
}
