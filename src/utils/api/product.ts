import {IProductDetails} from "@/types/model/productDetails";
import {BaseResponse} from "@/types/BaseResponse";
import {IReviewRequest} from "@/types/revview";
import {getAccessToken} from "@/utils/http";
import {PagingRequest} from "@/types/paging-request";
import {PagingResponse} from "@/types/paging-response";

export type PagingProductResponse = PagingResponse & { items: IProductDetails[] }

const ipUrl = `${process.env.IP_HOST}:${process.env.PORT_HOST}`;

export const fetchProduct = async ({ signal, filter, page, size }: {signal: AbortSignal, filter?: string, page: number, size: number} )=>  {
    let url = `${ipUrl}/product?`;
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
    const resp = await fetch(`${ipUrl}/product/${productId}`, {signal});
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
    const resp = await fetch(`${ipUrl}/product/revise-favorite/${productId}?action=${action}`, {
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
    const resp = await fetch(`${ipUrl}/review/create`, {
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

export const getProductByBrand = async ({ signal, request }: { signal: AbortSignal, request: PagingRequest & { productType: string } }) => {
    const response = await fetch(`${ipUrl}/product/catalog?productType=${request.productType}&page=${request.page}&size=${request.size}`, {
        signal
    });

    if (!response.ok) {
        throw new Error('CW-10-001');
    }

    const data = await response.json() as BaseResponse<PagingProductResponse>;
    if (data.status.code !== 200) {
        throw new Error(data.status.errorCode);
    }

    return data.data;
}