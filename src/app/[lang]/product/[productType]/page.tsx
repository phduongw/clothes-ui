import React, {FC} from 'react';
import ProductCatalogSummary from "@/components/product/product-catalog-summary";

interface Props {
    productType: string;
}

const CatalogComponent: FC<{ params: Promise<Props> }> = async ({ params }) => {
    const path = (await params).productType;


    return <ProductCatalogSummary path={path} />;
};

export default CatalogComponent;
