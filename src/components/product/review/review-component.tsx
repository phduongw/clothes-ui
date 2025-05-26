import React, { FC } from 'react';

import ReviewOverview from "@/components/product/review/review-overview";
import {IReview, IReviewProduct} from "@/types/revview";

const ReviewComponent: FC<{reviews?: IReviewProduct}> = ({ reviews }) => {
    const reviewsArray = reviews ? Object.values(reviews).flat() as IReview[] : [];
    const sortedReview = reviewsArray.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
    console.log("review sort", sortedReview)

    return (
        <div className={'w-full flex justify-center items-center mt-8'}>
            <div className={'w-[1200px] flex flex-col'}>
                <p className={'text-xl font-medium'}>Reviews</p>
                <div>
                    <ReviewOverview reviews={reviews} />
                </div>
            </div>
        </div>
    );
};

export default ReviewComponent;
