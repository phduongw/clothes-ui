import React, { FC } from 'react';
import {IProductDetails} from "@/types/model/productDetails";
import Image from "next/image";
import {CiHeart} from "react-icons/ci";
import {IoMdHeart} from "react-icons/io";
import {useTranslations} from "next-intl";

const ProductItem: FC<{ product: IProductDetails }> = ({ product }) => {
    const t = useTranslations('home.product');
    const image = product.images[0];
    return (
        <div className={'flex flex-col items-center justify-around relative bg-[#F6F6F6] w-[280px] h-[400px] py-4 px-10 rounded-2xl'}>
            <div className={'flex flex-col items-center justify-center gap-2 text-center font-medium'}>
                <CiHeart className={'absolute top-4 right-4 text-3xl text-gray-400 cursor-pointer'} />
                {/*<IoMdHeart className={'absolute top-4 right-4 text-3xl text-red-500'}/>*/}
                <div className={'w-[150px] h-[180px] flex justify-center items-center'}>
                    <Image src={image} alt={product.name} width={0} height={0} className={'w-[120px] h-auto'} unoptimized priority/>
                </div>
                <p>Apple iPhone 14 Pro Max 128GB Deep Purple</p>
                <p className={'mt-2 text-2xl font-bold'}>${product.price}</p>
            </div>
            <button className={'w-full bg-black text-white py-4 text-sm rounded-[8px] cursor-pointer hover:bg-gray-700'}>{t('buyBtn')}</button>
        </div>
    );
};

export default ProductItem;
