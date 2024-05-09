"use client";
import React, { useEffect, useState } from "react";
import { BiSolidStar } from "react-icons/bi";

interface IProps {
    defaultRating: number;
    onRating?: (rating: number) => void;
    color?: { filled: string; unfilled: string };
    iconSize?: number;
}

export default function StarRating({
    defaultRating = 5,
    onRating,
    color = { filled: "#ff9f00", unfilled: "#e4e4e7" },
    iconSize = 24,
}: IProps) {
    const [rating, setRating] = useState<number>(defaultRating);

    const getColor = (index: number) => {
        if (rating >= index) {
            return color.filled;
        }

        return color.unfilled;
    };

    const handleRating = (index: number) => {
        setRating(index);

        if (onRating) {
            const value = index + 1;
            onRating(value);
        }
    };

    return (
        <div className="flex items-center gap-x-1">
            {Array.from({ length: 5 }, (_, index) => index).map((index) => {
                return (
                    <BiSolidStar
                        key={index}
                        style={{ color: getColor(index) }}
                        className="cursor-pointer"
                        size={iconSize}
                        onClick={() => handleRating(index)}
                    />
                );
            })}
        </div>
    );
}
