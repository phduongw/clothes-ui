'use client';

import React, {FC, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getProductByBrand} from "@/utils/api/product";
import ProductCatalog from "@/components/product/product-catalog";
import {TbMathGreater} from "react-icons/tb";
import {Link} from "@/i18n/navigation";
import NavbarVertical from "@/components/common/navbar-vertical";

const ProductCatalogSummary: FC<{ path: string }> = ({ path }) => {
    const [page, setPage] = useState(1);
    const { data } = useQuery({
        queryKey: ['product', path, page],
        queryFn: async ({ signal, queryKey }) => {
            const productType = queryKey[1] as string;
            return await getProductByBrand({ signal, request: { productType, page, size: 9 } });
        }
    })

    let content;

    const handlePage = (value: number) => {
        console.log("Page", value);
        setPage(value);
    }

    if (data) {
        content = <ProductCatalog data={data} page={page} onPaging={handlePage} />;
    }

    return (
        <div className={'w-screen mt-8 flex justify-center'}>
            <div className={'w-[1200px] flex flex-col'}>
                <div className={'self-start flex items-center  gap-4 text-gray-400 text-xl'}>
                    <p>Home</p>
                    <TbMathGreater className={'font-bold text-sm'}/>
                    <p>Catalog</p>
                    <TbMathGreater className={'font-bold text-sm'}/>
                    <Link href={`/product/${path}`} className={'px-2 text-black'}>{path}</Link>
                </div>
                <div className={'flex mt-16'}>
                    <NavbarVertical />
                    { content }
                </div>
            </div>
        </div>
    );
};

export default ProductCatalogSummary;