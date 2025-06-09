'use client';

import React, { FC } from 'react';
import {PagingProductResponse} from "@/utils/api/product";
import ProductItem from "@/components/product/product-item";
import { Pagination } from "antd";

const ProductCatalog: FC<{ data: PagingProductResponse, page: number, onPaging: (value: number) => void }> = ({ data, page, onPaging }) => {
    const handlePageChange = (pageNumber: number, pageSize: number) => {
        console.log('Trang hiện tại:', pageNumber);
        console.log('Số bản ghi mỗi trang:', pageSize);
        onPaging(pageNumber);
    };

    return (
        <div className={'grow'}>
            <div className={'w-full flex justify-between'}>
                <p className={'text-xl text-gray-400 font-semibold flex gap-2'}>Selected Products: <span className={'text-black'}>{ data.total ?? 0 }</span></p>
            </div>
            <div className={'flex gap-2 mt-8'}>
                { data.items?.map(ele => (<ProductItem key={ele._id} product={ele} />)) }
            </div>
            <div className={'mt-12'}>
                <Pagination
                    align={'center'}
                    current={page}
                    total={500}
                    onChange={handlePageChange}
                    pageSize={9}
                />
            </div>
        </div>
    );
};

export default ProductCatalog;