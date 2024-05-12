interface ICartTopping {
    topping_storage_id: number;
    topping_id: number;
    topping_name: string;
    topping_price: string | number;
}

export interface ICart {
    id: number;
    product_id: number;
    product_name: string;
    product_price: string | number;
    product_image: string;
    product_status: number;
    size_id: number;
    size_name: string;
    size_price: string | number;
    quantity: number;
    toppings: ICartTopping[];
    order_item_price: number | string;
}
