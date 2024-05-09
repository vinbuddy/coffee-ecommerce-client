"use client";
import { IReview } from "@/types/review";
import { Progress } from "@nextui-org/react";
import Link from "next/link";
import { BiSolidStar } from "react-icons/bi";

interface IProps {
    reviews: IReview[];
}

const MAX_STAR: number = 5;

export default function ReviewRatingSection({ reviews = [] }: IProps) {
    const ratingAverage =
        (reviews.reduce((acc, review) => acc + review.rating, 0) * MAX_STAR) / (reviews.length * MAX_STAR);

    const renderRatingProgress = () => {
        const ratingCount = Array.from({ length: MAX_STAR }, (_, index) => {
            let starNumber = index + 1; // from 1 to 5
            let starRating = reviews.filter((review) => review.rating === starNumber).length;

            return starRating;
        });

        return ratingCount.map((count, index) => {
            const totalReviews = reviews.length;
            const percentage = (count / totalReviews) * 100;

            return (
                <li key={index} className="flex items-center justify-between mb-2">
                    <div className="flex-1 flex items-center">
                        <BiSolidStar className="text-default" />

                        <span className="ms-1.5 me-3">{index + 1}</span>

                        <Progress
                            aria-label="Loading..."
                            value={percentage}
                            size="sm"
                            className="max-w-sm"
                            classNames={{
                                track: "h-2",
                                indicator: "!bg-[#ff9f00]",
                            }}
                        />
                    </div>
                    <span className="text-black/55">{count}</span>
                </li>
            );
        });
    };

    return (
        <div className="p-5 rounded-xl border">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-2xl ">Xếp hạng đánh giá</h3>
                <Link className="text-[#0071e3]" href="">
                    {reviews.length} đánh giá
                </Link>
            </div>
            <div className="mb-5">
                <h4 className="flex items-center font-bold text-primary text-lg">
                    <span className="text-[#ff9f00] me-2">{Math.round(ratingAverage * 10) / 10}</span>
                    <BiSolidStar className="text-[#ff9f00]" />
                </h4>
            </div>
            <ul>
                {renderRatingProgress()}
                {/* <li className="flex items-center justify-between mb-2">
                    <div className="flex-1 flex items-center">
                        <BiSolidStar className="text-default" />

                        <span className="ms-1.5 me-3">5</span>

                        <Progress
                            aria-label="Loading..."
                            value={60}
                            size="sm"
                            className="max-w-sm"
                            classNames={{
                                track: "h-2",
                                indicator: "!bg-[#ff9f00]",
                            }}
                        />
                    </div>
                    <span className="text-black/55">3</span>
                </li>
                <li className="flex items-center justify-between mb-2">
                    <div className="flex-1 flex items-center">
                        <BiSolidStar className="text-default" />

                        <span className="ms-1.5 me-3">4</span>

                        <Progress
                            aria-label="Loading..."
                            value={10}
                            size="sm"
                            className="max-w-sm"
                            classNames={{
                                track: "h-2",
                                indicator: "bg-[#ff9f00]",
                            }}
                        />
                    </div>
                    <span className="text-black/55">3</span>
                </li>
                <li className="flex items-center justify-between mb-2">
                    <div className="flex-1 flex items-center">
                        <BiSolidStar className="text-default" />

                        <span className="ms-1.5 me-3">3</span>

                        <Progress
                            aria-label="Loading..."
                            value={20}
                            size="sm"
                            className="max-w-sm"
                            classNames={{
                                track: "h-2",
                                indicator: "bg-[#ff9f00]",
                            }}
                        />
                    </div>
                    <span className="text-black/55">3</span>
                </li>
                <li className="flex items-center mb-2">
                    <div className="flex-1 flex items-center me-3">
                        <BiSolidStar className="text-default" />

                        <span className="ms-1.5 me-3">2</span>

                        <Progress
                            aria-label="Loading..."
                            value={0}
                            size="sm"
                            className="max-w-sm"
                            classNames={{
                                track: "h-2",
                                indicator: "bg-[#ff9f00]",
                            }}
                        />
                    </div>
                    <span className="text-black/55">3</span>
                </li>
                <li className="flex items-center justify-between mb-2">
                    <div className="flex-1 flex items-center">
                        <BiSolidStar className="text-default" />

                        <span className="ms-1.5 me-3">1</span>

                        <Progress
                            aria-label="Loading..."
                            value={0}
                            size="sm"
                            className="max-w-sm"
                            classNames={{
                                track: "h-2",
                                indicator: "bg-[#ff9f00]",
                            }}
                        />
                    </div>
                    <span className="text-black/55">3</span>
                </li> */}
            </ul>
        </div>
    );
}
