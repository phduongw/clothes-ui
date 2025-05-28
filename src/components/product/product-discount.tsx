'use client';

import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchProduct} from "@/utils/api/product";
import {LoadingOutlined} from "@ant-design/icons";
import {notification, Spin} from "antd";
import ProductItem from "@/components/product/product-item";
import {Link} from "@/i18n/navigation";

const ProductDiscount = () => {
    const [api, contextHolder] = notification.useNotification();

    const {data, isPending, error, isError} = useQuery({
        queryKey: ['products', {page: 1, size: 4}],
        queryFn: async ({ signal, queryKey}) => {
            const {page, size} = queryKey[1] as { page: number, size: number };
            return await fetchProduct({signal, filter: 'discount', page, size})
        },
        staleTime: 5000
    });

    let content;
    if (isPending) {
        content = <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    }

    if (isError) {
        api.error({
            message: error.message,
            description: `Related Product cannot show`,
            placement: 'topRight',
            duration: 2
        });

        content = null;
    }

    if (data) {
        content = data.items.map((ele) => (
            <Link key={ele._id} href={`/product/${ele.typeProduct}/${ele.brand}/${ele._id}`}><ProductItem product={ele} /></Link>
        ))
    }

    return (
        <div>
            { contextHolder }
            {content}
        </div>
    );
};

export default ProductDiscount;
