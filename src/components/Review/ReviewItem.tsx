import { Avatar, Chip } from "@nextui-org/react";

import StarRating from "../UI/StarRating";
import { formatDateTime } from "@/lib/utils";
import { IReview } from "@/types";

interface IProps {
    review: IReview;
}

export default function ReviewItem({ review }: IProps) {
    return (
        <div className="flex">
            <Avatar src={review.avatar || ""} />
            <div className="ms-2 flex-1">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{review.user_name}</h3>
                    <p className="text-sm text-black/50">{formatDateTime(review.review_date)}</p>
                </div>
                <div>
                    <div className="flex items-center gap-x-1 mt-1">
                        <StarRating iconSize={16} defaultRating={review.rating} />
                    </div>
                </div>
                <div className="flex items-center mt-1">
                    <p className="text-sm text-black/50">Phân loại hàng: &nbsp;</p>
                    <div className="flex items-center gap-x-2">
                        {review.order_products.map((product, index) => (
                            <Chip key={index} size="sm" variant="flat">
                                {product.product_name}
                            </Chip>
                        ))}
                        {/* <Chip size="sm" variant="flat">
                    Bạc sỉu
                </Chip>
                <Chip size="sm" variant="flat">
                    Bạc sỉu
                </Chip> */}
                    </div>
                </div>
                <p className="text-sm mt-2">{review.content}</p>
            </div>
        </div>
    );
}
