
import React, { FC } from 'react';
import ProductInfo from "@/components/product/product-info";

interface Props {
    productID: string
}

const ProductDetails: FC<{ params: Promise<Props> }> = async ({ params }) => {
    const { productID } = await params;
    console.log("Params: ", params);
    return (
        <ProductInfo productID={productID} />
    );
};

export default ProductDetails;
