import {IProductDetails} from "@/types/model/productDetails";
import {BaseResponse} from "@/types/BaseResponse";
import {IReviewRequest} from "@/types/revview";
import {getAccessToken} from "@/utils/http";

export const fetchProduct = async ({ signal, filter, page, size }: {signal: AbortSignal, filter?: string, page: number, size: number} )=>  {
    let url = 'http://localhost:8828/product?';
    if (filter) {
        url += `productFilter=${filter}&`;
    }

    if (!page) {
        page = 1
    }

    if (!size) {
        size = 10;
    }

    url += `page=${page}&size=${size}`;
    const resp = await fetch(url, {signal});
    if (!resp.ok) {
        throw new Error('CW-10-001');
    }

    const product = await resp.json() as BaseResponse<{ items: IProductDetails[], page: number, size: number, totalData: number }>;

    if (product.status.code !== 200) {
        throw new Error(product.status.errorCode);
    }

    return product.data;
}

export const fetchProductById = async ({ productId, signal }: {productId: string, signal: AbortSignal}) => {
    const resp = await fetch(`http://localhost:8828/product/${productId}`, {signal});
    if (!resp.ok) {
        throw new Error('CW-10-001');
    }

    const data = await resp.json() as BaseResponse<IProductDetails>;
    if (!data || data.status.code !== 200) {
        throw new Error(data.status.errorCode);
    }

    return data.data!;
}

export const reviseFavorite = async (productId: string, action: 'add' | 'remove', token: string) => {
    const resp = await fetch(`http://localhost:8828/product/revise-favorite/${productId}?action=${action}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!resp.ok) {
        throw new Error('CW-10-001');
    }

    const data = await resp.json() as BaseResponse<{ favoriteList: string[] }>;
    if (data.status.code !== 200) {
        throw new Error(data.status.errorCode)
    }

    return data.data!.favoriteList;
}

export const addNewReview = async (review: IReviewRequest) => {
    console.log("Call Add new review");
    const resp = await fetch(`http://localhost:8828/review/create`, {
        method: 'POST',
        body: JSON.stringify(review),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });

    if (!resp.ok) {
        throw new Error('CW-10-001');
    }

    const data = await resp.json() as BaseResponse<null>;
    console.log("Data review: ", data)
    if (data.status.code !== 200) {
        throw new Error(data.status.errorCode)
    }
}