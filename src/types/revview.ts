export interface IReview {
    name: string;
    content: string;
    rating: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IReviewProduct {
    _1: IReview[];
    _2: IReview[];
    _3: IReview[];
    _4: IReview[];
    _5: IReview[];
}