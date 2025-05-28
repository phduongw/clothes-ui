'use client';

import React, {FC} from 'react';
import Image from "next/image";
import {CiHeart} from "react-icons/ci";
import {IoMdHeart} from "react-icons/io";
import {useTranslations} from "next-intl";
import {IProductDetails} from "@/types/model/productDetails";
import {useFavorite} from "@/hooks/useFavorite";

const ProductItem: FC<{ product: IProductDetails }> = ({ product }) => {
    const t = useTranslations('home.product');
    const image = product.color![0].images[0];
    const { modify, get } = useFavorite();

    return (
        <div className={'flex flex-col items-center justify-around relative bg-[#F6F6F6] w-[280px] h-[400px] py-4 px-10 rounded-2xl'}>
            <div className={'flex flex-col items-center justify-center gap-2 text-center font-medium'}>
                {
                    get?.includes(product._id) ?
                        <IoMdHeart className={'absolute top-4 right-4 text-3xl text-red-500'} onClick={(e) => modify.fn(e, product._id, 'remove')} /> :
                        <CiHeart className={'absolute top-4 right-4 text-3xl text-gray-400 cursor-pointer'} onClick={(e) => modify.fn(e, product._id, 'add')}/>
                }
                <div className={'w-[150px] h-[180px] flex justify-center items-center'}>
                    <Image src={image} alt={product.name} width={0} height={0} className={'w-[120px] h-auto'} unoptimized priority/>
                </div>
                <p>{product.name}</p>
                <p className={'mt-2 text-2xl font-bold'}>${product.price}</p>
            </div>
            <button className={'w-full bg-black text-white py-4 text-sm rounded-[8px] cursor-pointer hover:bg-gray-700'}>{t('buyBtn')}</button>
        </div>
    );
}

export default ProductItem;
