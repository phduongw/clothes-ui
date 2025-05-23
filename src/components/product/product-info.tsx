'use client';

import React, {FC, useEffect, useState} from 'react';
import Image from "next/image";
import {usePathname} from "@/i18n/navigation";
import {useQuery} from "@tanstack/react-query";
import {fetchProductById} from "@/utils/api/product";
import {useTranslations} from "next-intl";

const ProductInfo: FC<{ productID: string }> = ({ productID }) => {
    const [displayImages, setDisplayImages] = useState<string>('');
    const t = useTranslations('msg.error');
    const handleDisplayImage = (url: string) => setDisplayImages(url);
    const path = usePathname();
    console.log("Path: ", path)

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['product', productID],
        queryFn: async ({ signal, queryKey }) => {
            const id = queryKey[1];
            return await fetchProductById({productId: id, signal})
        },
        staleTime: 5000
    });

    useEffect(() => {
        if (data) {
            setDisplayImages(data.images[0]);
        }
    }, [data, productID]);

    return (
        <div className={'w-full flex justify-center items-center'}>
            { isError && <p>{t(error.message)}</p> }
            { isPending && <p>Loading....</p> }
            { data && (
                <div className={'w-[1200px] flex justify-start items-center al mt-12 gap-3'}>
                    <div className={'flex gap-6'}>
                        <div className={'flex flex-col w-[50px] h-[300px] gap-2'}>
                            { data.images.map(ele => (
                                <button className={`${ ele !== displayImages ? "relative cursor-pointer before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-gray-200/50" : undefined }`} key={ele} onClick={() => handleDisplayImage(ele)}>
                                    <Image
                                        src={ele}
                                        alt={data.name}
                                        width={0}
                                        height={0}
                                        className={`w-[100%] h-auto cursor-pointer`}
                                        unoptimized
                                        priority
                                    />
                                </button>
                            )) }
                        </div>
                        <Image src={displayImages} alt={data.name} width={0} height={0} className={'w-[300px] h-auto'} unoptimized priority />
                    </div>
                    <div>
                        <div>

                        </div>
                    </div>
                </div>
            ) }
        </div>
    );
}
export default ProductInfo;
