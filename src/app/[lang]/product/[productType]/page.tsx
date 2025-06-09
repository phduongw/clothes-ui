import React, {FC} from 'react';
import {Link} from "@/i18n/navigation";

interface Props {
    productType: string;
}

const CatalogComponent: FC<{ params: Promise<Props> }> = async ({ params }) => {
    const path = (await params).productType;
    return (
        <div>
            <div className={'flex gap-4 text-xl font-medium'}>
                <p>Catalog</p>
                <Link href={`/product/${path}`} className={'border-l-2 border-gray-200 px-2'}>{path}</Link>
            </div>
        </div>
    );
};

export default CatalogComponent;
