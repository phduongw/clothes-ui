import {IProductDetails} from "@/types/model/productDetails";
import {BaseResponse} from "@/types/BaseResponse";

export const fetchProduct = async ({ signal, filter, page, size }: {signal: AbortSignal, filter: string, page: number, size: number} )=>  {
    const resp = await fetch(`http://localhost:8828/product?productFilter=${filter}&page=${page}&size=${size}`, {signal});
    if (!resp.ok) {
        throw new Error('CW-10-001');
    }

    const product = await resp.json() as BaseResponse<{ items: IProductDetails[], page: number, size: number, totalData: number }>;

    if (product.status.code !== 200) {
        throw new Error(product.status.errorCode);
    }

    return product.data;
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