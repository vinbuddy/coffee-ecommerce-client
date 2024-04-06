import { ISize } from "./size";
import { ITopping } from "./topping";

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

export interface IProductTopping extends ITopping {
    product_id: number;
}
export interface IProductSize extends ISize {
    id: number;
    product_id: number;
    size_id: number;
    size_name: string;
    size_price: number | string;
}

export interface IAddProduct extends IProduct {
    product_toppings: number[];
    product_sizes: { size_id: number; size_price: number | string }[];
}
