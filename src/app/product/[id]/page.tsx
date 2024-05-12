import AddToCartForm from "@/components/Cart/AddToCartForm";
import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import { fetchData, formatVNCurrency } from "@/lib/utils";
import { IProduct, IProductSize, IProductTopping } from "@/types/product";
import { Avatar, Button, Chip, Image, Progress, User } from "@nextui-org/react";
import { Metadata, ResolvingMetadata } from "next";
import { GoHeart, GoHeartFill, GoShare } from "react-icons/go";
import { BiSolidStar, BiStar, BiSolidStarHalf } from "react-icons/bi";
import React from "react";
import Link from "next/link";
import emptyProduct from "@/assets/images/empty-product.png";
import ProductDetailActions from "@/components/Product/ProductDetailActions";
import ReviewRatingSection from "@/components/Review/ReviewRatingSection";
import { IReview } from "@/types/review";
import ReviewItem from "@/components/Review/ReviewItem";

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/",
    },
    {
        content: "Menu",
        href: "/product",
    },
    {
        content: "Trà long hạt sen",
        href: "/product/:id",
    },
];

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const id = params.id;

    // fetch data
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`);

    const productData = await response.json();
    const product: IProduct = productData.data;

    // Adding product name to breadcumbs
    const lastBreadcumbItem = breadcumbItems[breadcumbItems.length - 1];

    // Edit the content of the last item
    lastBreadcumbItem.content = product?.name;
    lastBreadcumbItem.href = "/product/" + product?.id;

    return {
        title: product?.name,
    };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const [productData, reviewData] = await Promise.all([
        fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${params.id}`),
        fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/review/product/${params.id}`),
    ]);

    const product: IProduct = productData.data;
    const reviews: IReview[] = reviewData.data || [];

    if (!product) {
        return (
            <div className="container pb-10">
                <div className="px-6">
                    <div className="flex items-center justify-center flex-col">
                        <Image className="w-full" src={emptyProduct.src} alt="empty product" />
                        <p className="mt-5 text-gray-500 text-lg">Không tìm thấy sản phẩm</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container pb-10">
            <div className="px-6">
                <div className="mb-5">
                    <Breadcrumbs breadcumbItems={breadcumbItems} />
                </div>

                <div>
                    <div className="grid grid-cols-12 gap-5">
                        <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                            <div>
                                <Image className="w-full h-auto mb-5" src={product?.image} alt="" />
                                {product?.id && <ProductDetailActions productId={product.id} />}
                            </div>
                        </section>
                        <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                            <div>
                                <h1 className="font-bold text-3xl">{product?.name}</h1>
                                <p className="text-primary text-xl mt-3">{formatVNCurrency(product?.price)}</p>
                                <p className="mt-3 text-gray-500">{product?.description}</p>

                                <div className="mt-4">
                                    {product && product?.status ? (
                                        <AddToCartForm product={product} />
                                    ) : (
                                        <Button isDisabled fullWidth>
                                            Sản phẩm đã hết
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="grid grid-cols-12 gap-5 mt-14">
                        <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                            <ReviewRatingSection reviews={reviews} />
                        </section>
                        <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                            <div>
                                <div>
                                    <h3 className="font-bold text-2xl mb-5">Các đánh giá</h3>
                                    <div>
                                        {reviews.map((review) => (
                                            <div className="mb-5 last:mb-0" key={review.id}>
                                                <ReviewItem review={review} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
