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