
import React, { FC } from 'react';
import ProductInfo from "@/components/product/product-info";
import ReviewComponent from "@/components/product/review/review-component";

interface Props {
    productID: string
}

const ProductDetails: FC<{ params: Promise<Props> }> = async ({ params }) => {
    const { productID } = await params;
    return (
        <div>
            <ProductInfo productID={productID} />
            <ReviewComponent />
        </div>
    );
};

export default ProductDetails;
