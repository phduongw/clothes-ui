import React, { FC } from 'react';
import Image from "next/image";

import avt from '@/public/assets/logo.jpg';
import {Rate} from "antd";
import {IReview} from "@/types/revview";

const ReviewDetails: FC<{ review: IReview }> = ({ review }) => {
    const createdDateReview = new Date(review.createdAt);
    const month = createdDateReview.toLocaleString('en-US', { month: 'long' });
    const day = createdDateReview.getDate();
    const year = createdDateReview.getFullYear();
    return (
        <div className={'w-full bg-gray-100 mt-8 p-4 flex gap-6 items-center rounded-2xl'}>
            <Image src={avt} alt={'avatar'} className={'w-[50px] h-[50px] rounded-full'} unoptimized priority />
            <div className={'w-full flex flex-col gap-3'}>
                <div className={'w-full flex justify-between'}>
                    <p className={'font-semibold'}>{review.name}</p>
                    <p className={'text-sm text-gray-400 font-semibold'}>{ day } { month }, { year }</p>
                </div>
                <Rate allowHalf disabled value={review.rating} />
                <p className={'w-full text-[15px] text-gray-500'}>{review.content}</p>
            </div>
        </div>
    );
};

export default ReviewDetails;
