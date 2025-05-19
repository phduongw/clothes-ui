'use client';

import React, {FC, useRef, useState} from 'react';

import ReviewOverview from "@/components/product/review/review-overview";
import {IReview, IReviewProduct, IReviewRequest} from "@/types/revview";
import ReviewDetails from "@/components/product/review/review-details";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import {IAuthState} from "@/stores/actions/auth/authSlice";
import {Link} from "@/i18n/navigation";
import {useMutation} from "@tanstack/react-query";
import {addNewReview} from "@/utils/api/product";
import { queryClient } from "@/utils/http";
import {Rate} from "antd";

const ReviewComponent: FC<{reviews?: IReviewProduct, productID: string}> = ({ reviews, productID }) => {
    const inputRep = useRef<HTMLInputElement | null>(null);
    const authState = useSelector<RootState, IAuthState>(state => state.auth);
    const [errorReview, setErrorReview] = useState<string | null>(null);
    const [rate, setRate] = useState<number | null>(null);

    const { mutate } = useMutation({
        mutationFn: async (data: IReviewRequest) => await addNewReview(data),
        onSuccess: async () => {
            inputRep.current!.value = '';
            setRate(0);
            await queryClient.invalidateQueries({
                queryKey: ['product', productID]
            });
        }
    })

    const handleCreateReview = () => {
        const content = inputRep.current?.value;
        console.log("Content review", content);
        if (!content?.trim()) {
            setErrorReview('Content cannot be empty');
            return;
        }
        if (!rate) {
            setErrorReview("Rate can't be empty");
            return;
        }

        mutate({ productId: productID, content, rating: rate })
    }

    const reviewsArray = reviews ? (Object.values(reviews).flat() as IReview[]).sort((a, b) => {
        const dateB = new Date(b.createdAt);
        const dateA = new Date(a.createdAt);
        return dateB.getTime() - dateA.getTime()
    }) : [];

    return (
        <div className={'w-full flex justify-center items-center mt-8'}>
            <div className={'w-[1200px] flex flex-col'}>
                <p className={'text-xl font-medium'}>Reviews</p>
                <div>
                    <ReviewOverview reviews={reviews} />
                    {errorReview && <p>{errorReview}</p>}
                    { authState.token ?
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleCreateReview();
                            }}
                            className="w-full mt-12 flex flex-col gap-3 rounded-[8px]"
                        >
                            <Rate value={rate ?? 0} onChange={(value) => setRate(value)} />
                            <input
                                ref={inputRep}
                                type="text"
                                className="w-full h-[70px] pl-3 border border-gray-300 focus:outline-none focus:border-gray-400 rounded-[8px]"
                                placeholder="Leave the comment"
                            />
                            <button
                                type="submit"
                                className="bg-black text-white px-8 py-2 rounded-[8px] w-fit self-end cursor-pointer hover:bg-black/50"
                            >
                                Send
                            </button>
                        </form> :
                        <div className={'w-full h-[70px] bg-gray-200 border border-gray-300 rounded-[8px] flex justify-center items-center mt-12 gap-1 text-gray-700'}>
                            <span>Need to </span>
                            <Link href={'/auth?mode=login'} className={'font-semibold'}>Login</Link>
                            <span> to leave the review </span>
                        </div>
                    }
                    <div className={'mt-14'}>
                        { reviewsArray.map(ele => (
                            <ReviewDetails key={ele._id} review={ele} />
                        )) }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewComponent;
