'use client';

import React, { FC } from 'react';

import { Rate } from "antd";
import {IReviewProduct} from "@/types/revview";

const ReviewOverview: FC<{ reviews: IReviewProduct }> = ({ reviews }) => {
    const totalReview = reviews ? reviews._1.length + reviews._2.length + reviews._3.length + reviews._4.length + reviews._5.length : 0;
    // const level = ['', 'Good', 'Average', 'Below Average', 'Poor']
    const level = [{
        levelName: 'Excellent',
        percentRating: totalReview ? reviews._1.length / totalReview * 100 : 0,
    }, {
        levelName: 'Good',
        percentRating: totalReview ? reviews._2.length / totalReview * 100 : 0,
    }, {
        levelName: 'Average',
        percentRating: totalReview ? reviews._3.length / totalReview * 100 : 0
    }, {
        levelName: 'Below Average',
        percentRating: totalReview ? reviews._4.length / totalReview * 100 : 0
    }, {
        levelName: 'Poor',
        percentRating: totalReview ? reviews._5.length / totalReview * 100 : 0
    }];

    const getAverageRating = (reviews: IReviewProduct): number => {
        if (totalReview === 0) return 0;

        const sum =
            reviews._1.length +
            reviews._2.length * 2 +
            reviews._3.length * 3 +
            reviews._4.length * 4 +
            reviews._5.length * 5;

        return +(sum / totalReview).toFixed(1); // làm tròn đến 1 số thập phân
    };

    const averageScore = getAverageRating(reviews);

    return (
        <div className={'flex gap-30 mt-8'}>
            <div className={'flex flex-col justify-center gap-3 items-center w-[180px] h-[180px] bg-[#fafafa] rounded-2xl p-4'}>
                <p className={'text-5xl font-bold'}>{averageScore}</p>
                <p className={'text-sm text-gray-400'}>Of { totalReview } reviews</p>
                <Rate allowHalf defaultValue={4.5} />
            </div>

            <div className={'flex-1 h-[180px] flex flex-col justify-between'}>
                { level.map((ele => (
                    <div key={ele.levelName} className={'flex w-full h-[12px]'}>
                        <p className={'min-w-[150px]'}>{ele.levelName}</p>
                        <p className={`flex-1 h-full bg-amber-50 rounded-2xl relative`}>
                            <div
                                className={'absolute h-full bg-amber-500 rounded-2xl'}
                                style={{width: `${ele.percentRating}%`}}
                            ></div>
                        </p>
                    </div>
                ))) }
            </div>
        </div>
    );
};

export default ReviewOverview;
