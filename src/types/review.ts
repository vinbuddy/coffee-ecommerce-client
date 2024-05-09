export interface IReview {
    id: number;
    order_id: string;
    content: string;
    rating: number;
    review_date: string;
    user_name: string;
    email: string;
    avatar: string | null;
    order_products: IOrderProduct[];
}

interface IOrderProduct {
    product_id: number;
    product_name: string;
    product_price: string;
    product_image: string;
}
