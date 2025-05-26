import React from 'react';
import ReviewOverview from "@/components/product/review/review-overview";

const ReviewComponent = () => {
    return (
        <div className={'w-full flex justify-center items-center mt-8'}>
            <div className={'w-[1200px] flex flex-col'}>
                <p>Reviews</p>
                <div>
                    <ReviewOverview reviews={undefined} />
                </div>
            </div>
        </div>
    );
};

export default ReviewComponent;
