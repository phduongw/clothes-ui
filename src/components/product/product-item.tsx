'use client';

import React, {FC, useEffect, memo} from 'react';
import Image from "next/image";
import {CiHeart} from "react-icons/ci";
import {IoMdHeart} from "react-icons/io";
import {useTranslations} from "next-intl";
import {useSelector, useDispatch} from "react-redux";
import { useMutation } from "@tanstack/react-query";

import {AppDispatch, RootState} from "@/stores";
import {IProductDetails} from "@/types/model/productDetails";
import {IAuthState} from "@/stores/actions/auth/authSlice";
import {reviseFavourite} from "@/stores/actions/auth/authActions";
import {reviseFavorite} from "@/utils/api/product";

const ProductItemComponent: FC<{ product: IProductDetails }> = ({ product }) => {
    const t = useTranslations('home.product');
    const dispatch = useDispatch<AppDispatch>();
    const { token, favoritesList } = useSelector<RootState, IAuthState>(state => state.auth);
    const image = product.color![0].images[0];

    const { data, mutate } = useMutation({
        mutationFn: async ({ productId, action, accessToken }: {productId: string, action: 'add' | 'remove', accessToken: string}) => await reviseFavorite(productId, action, accessToken)
    });

    const handleRevisingFavorite = (e: React.MouseEvent<SVGElement>, productId: string, action: 'add' | 'remove') => {
        e.preventDefault();
        e.stopPropagation();
        let response: string[] = [];
        if (token) {
            mutate({ productId, action, accessToken: token });
        } else {
            const favoriteListStorage = localStorage.getItem('favoriteList');
            response = favoriteListStorage ? JSON.parse(favoriteListStorage) as string[] : [];
            if (action === 'add') {
                response.push(productId);
            } else {
                response = response.filter(ele => ele !== productId);
            }

            localStorage.setItem('favoriteList', JSON.stringify(response));
            dispatch(reviseFavourite(response))
        }
    }

    useEffect(() => {
        if (data) {
            dispatch(reviseFavourite(data));
        }
    }, [data, dispatch])

    return (
        <div className={'flex flex-col items-center justify-around relative bg-[#F6F6F6] w-[280px] h-[400px] py-4 px-10 rounded-2xl'}>
            <div className={'flex flex-col items-center justify-center gap-2 text-center font-medium'}>
                {
                    favoritesList?.includes(product._id) ?
                        <IoMdHeart className={'absolute top-4 right-4 text-3xl text-red-500'} onClick={(e) => handleRevisingFavorite(e, product._id, 'remove')} /> :
                        <CiHeart className={'absolute top-4 right-4 text-3xl text-gray-400 cursor-pointer'} onClick={(e) => handleRevisingFavorite(e, product._id, 'add')}/>
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

ProductItemComponent.displayName = 'ProductItem';
const ProductItem = memo(ProductItemComponent);

export default ProductItem;
