export interface IReview {
    name: string;
    content: string;
    rating: number;
    createdAt: string;
    updatedAt?: string;
    _id: string
}

export interface IReviewProduct {
    _1: IReview[];
    _2: IReview[];
    _3: IReview[];
    _4: IReview[];
    _5: IReview[];
}

export interface IReviewRequest {
    productId: string;
    content: string;
    rating: number;
}