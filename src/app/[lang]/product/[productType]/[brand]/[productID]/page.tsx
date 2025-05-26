
import React, { FC } from 'react';
import ProductInfo from "@/components/product/product-info";

interface Props {
    productID: string
}

const ProductDetails: FC<{ params: Promise<Props> }> = async ({ params }) => {
    const { productID } = await params;
    return (
        <div>
            <ProductInfo productID={productID} />
        </div>
    );
};

export default ProductDetails;
