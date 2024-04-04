import { ISize } from "./size";

export interface IProduct {
    id?: number;
    name: string;
    price: string | number;
    description: string;
    image: string;
    status: string | number;
    category_id: number;
    category_name?: string;
}

export interface IAddProduct extends IProduct {
    product_toppings: number[];
    product_sizes: { size_id: number; size_price: number | string }[];
}
