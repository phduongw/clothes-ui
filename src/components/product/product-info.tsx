'use client';

import React, {FC, useEffect, useState} from 'react';
import Image from "next/image";
import {usePathname} from "@/i18n/navigation";
import {useQuery} from "@tanstack/react-query";
import {fetchProductById} from "@/utils/api/product";
import {useTranslations} from "next-intl";
import {GiBattery75, GiCpu, GiPlainCircle} from "react-icons/gi";
import { IColor } from "@/types/model/productDetails";
import SpecificationItem from "@/components/product/SpecificationItem";
import {SlScreenSmartphone} from "react-icons/sl";
import {LuCpu} from "react-icons/lu";
import {IoIosCamera} from "react-icons/io";
import {IoCameraReverseSharp} from "react-icons/io5";
import ReviewComponent from "@/components/product/review/review-component";

const ProductInfo: FC<{ productID: string }> = ({ productID }) => {
    const [displayImages, setDisplayImages] = useState<string>('');
    const [currentSelectedColorProduct, setCurrentSelectedColorProduct] = useState<IColor>();
    const [currentSelectedStorage, setCurrentSelectedStorage] = useState<number>();
    const t = useTranslations('msg.error');
    // const path = usePathname();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['product', productID],
        queryFn: async ({ signal, queryKey }) => {
            const id = queryKey[1];
            return await fetchProductById({productId: id, signal})
        },
        staleTime: 5000
    });

    const handleDisplayImage = (url: string) => setDisplayImages(url);
    const handleSelectColorProduct = (colorCode: string) => {
        const selectedColor = data?.color?.find(ele => ele.colorCode === colorCode);
        if (selectedColor !== currentSelectedColorProduct || !currentSelectedColorProduct) {
            setCurrentSelectedColorProduct(selectedColor);
            setDisplayImages(selectedColor!.images[0])
        }
    }

    useEffect(() => {
        if (data) {
            setCurrentSelectedColorProduct(data.color![0])
            setDisplayImages(data.color![0].images[0]);
        }
    }, [data, productID]);

    return (
        <div>
            <div className={'w-full flex justify-center items-center mt-16'}>
                {isError && <p>{t(error.message)}</p>}
                {isPending && <p>Loading....</p>}
                {data && (
                    <div className={'w-[1200px] flex justify-start items-center al mt-12 gap-3'}>
                        <div className={'flex gap-6 w-[50%]'}>
                            <div className={'flex flex-col justify-center w-[50px] h-[300px] gap-2'}>
                                {currentSelectedColorProduct?.images.map(ele => (
                                    <button
                                        className={`${ele !== displayImages ? "relative cursor-pointer before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-white before:opacity-50" : undefined}`}
                                        key={ele} onClick={() => handleDisplayImage(ele)}>
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
                                ))}
                            </div>
                            {displayImages && <Image src={displayImages} alt={data.name} width={0} height={0}
                                                     className={'flex-1 h-auto'} unoptimized priority/>}

                        </div>
                        <div className={'self-start'}>
                            <div className={'flex flex-col gap-6'}>
                                <p className={'text-3xl font-bold'}>{data.brand} {data.name}</p>
                                <p className={'text-2xl font-bold'}>${data.price}</p>
                                <div className={'flex items-center gap-4 mt-[-12px]'}>
                                    <p>Select Color:</p>
                                    <div className={'flex'}>
                                        {data.color!.map(ele => <GiPlainCircle
                                            key={ele.colorCode}
                                            style={{
                                                color: ele.colorCode,
                                            }}
                                            className={`cursor-pointer text-4xl`}
                                            onClick={() => handleSelectColorProduct(ele.colorCode)}
                                        />)}
                                    </div>
                                </div>
                                <div className={'w-full flex gap-4'}>
                                    {currentSelectedColorProduct?.details.map(detail => (<button
                                        key={detail.storage}
                                        disabled={detail.quantity === 0}
                                        className={`border-1 rounded-[8px] px-7  py-2 cursor-pointer font-medium transition duration-200 ease-in-out ${currentSelectedStorage && currentSelectedStorage === detail.storage ? 'bg-gray-300 border-gray-300 text-gray-600 ' : 'border-gray-500 text-gray-500'}`}
                                        onClick={() => setCurrentSelectedStorage(detail.storage)}
                                    >
                                        {detail.storage}GB
                                    </button>))}
                                </div>
                            </div>
                            <div className={'mt-8 w-[700px] flex flex-wrap gap-3'}>
                                <SpecificationItem title={'Screen size'}
                                                   info={data.specification.screenSize.toString()}>
                                    <SlScreenSmartphone className={'text-xl'}/>
                                </SpecificationItem>
                                <SpecificationItem title={'CPU'} info={data.specification.cpu.toString()}>
                                    <GiCpu className={'text-xl'}/>
                                </SpecificationItem>
                                <SpecificationItem title={'Number of Cores'}
                                                   info={data.specification.coreCpu.toString()}>
                                    <LuCpu className={'text-xl'}/>
                                </SpecificationItem>
                                <SpecificationItem title={'Main camera'} info={data.specification.mainCamera}>
                                    <IoIosCamera className={'text-xl'}/>
                                </SpecificationItem>
                                <SpecificationItem title={'Front camera'}
                                                   info={data.specification.frontCamera.toString()}>
                                    <IoCameraReverseSharp className={'text-xl'}/>
                                </SpecificationItem>
                                <SpecificationItem title={'Battery capacity'}
                                                   info={data.specification.batteryCapacity.toString()}>
                                    <GiBattery75 className={'text-xl'}/>
                                </SpecificationItem>
                            </div>
                            <div className={'flex mt-8 w-[566px] gap-4'}>
                                <button className={'flex-1 rounded-[8px] border-1'}>
                                    Add to Wishlist
                                </button>
                                <button className={'flex-1 rounded-[8px] py-4 bg-[#000] text-white'}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ReviewComponent reviews={data?.reviews} productID={productID}/>
        </div>

    );
}
export default ProductInfo;
