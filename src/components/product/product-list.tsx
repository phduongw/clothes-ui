'use client';

import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchProduct} from "@/utils/api/product";
import ProductItem from "@/components/product/product-item";
import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";

const ProductList = () => {
    const [queryProduct, setQueryProduct] = useState<string>('new-arrivals');
    const t = useTranslations('home.product');
    const {data, isPending, error, isError} = useQuery({
        queryKey: ['products', queryProduct, {page: 1, size: 10}],
        queryFn: async ({ signal, queryKey}) => {
            const {page, size} = queryKey[2] as { page: number, size: number };
           return await fetchProduct({signal, filter: queryProduct, page, size})
        },
        staleTime: 5000
    });

    const handleChangeQuery = (query: string) => {
        setQueryProduct(query);
    }

    if (isPending) {
        return <p>Loading...</p>;
    }

    return (
        <div className={'w-[1200px]'}>
            <div className="w-full flex gap-7 pt-12 box-border">
                {[
                    { key: 'new-arrivals', label: t('newArrival') },
                    { key: 'best-seller', label: t('bestSeller') },
                    { key: 'featured-products', label: t('featured') },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => handleChangeQuery(key)}
                        className={`text-xl cursor-pointer pb-1 transition-colors duration-200 ${
                            queryProduct === key
                                ? 'text-black border-b-2 border-black'
                                : 'text-gray-400 border-b-2 border-transparent'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className={'w-full flex flex-wrap gap-4 pt-9'}>
                {isError && <p>{error.message}</p>}
                {data?.items && data?.items.length > 0 ? data?.items.map(ele => (
                    <Link key={ele._id} href={'/'}><ProductItem product={ele} /></Link>
                )) : <p>Have no product</p>}
            </div>
        </div>
    );
};

export default ProductList;
