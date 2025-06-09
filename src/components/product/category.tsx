import React from 'react';
import Image from "next/image";

import popImage from '@/public/assets/pop-devices.jpg'

const Category = () => {
    return (
        <div className={'w-full flex mt-14 max-sm:w-screen max-sm:bg-gray-200'}>
            <div className={'w-full flex flex-col max-sm:w-screen max-sm:overflow-hidden'}>
                <Image src={popImage} alt={'pop devices'} width={0} height={0} className={'max-sm:w-screen max-sm:h-auto'} />
                <div className={'p-10 flex flex-col gap-8'}>
                    <p className={'text-2xl font-semibold'}>Popular Products</p>
                    <p className={'text-[#656565]'}>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use</p>
                    <button className={'border-2 border-gray-700 h-[50px] w-[200px] px-12 rounded-sm cursor-pointer'}>Shop now</button>
                </div>
            </div>
            <div className={'w-full flex flex-col bg-[#f9f9f9] max-sm:hidden'}>
                <Image src={popImage} alt={'pop devices'} width={0} height={0} className={''} />
                <div className={'p-10 flex flex-col gap-8'}>
                    <p className={'text-2xl font-semibold'}>Ipad Pro</p>
                    <p className={'text-[#656565]'}>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use</p>
                    <button className={'border-2 border-gray-700 h-[50px] w-[200px] px-12 rounded-sm cursor-pointer'}>Shop now</button>
                </div>
            </div>
            <div className={'w-full flex flex-col bg-[#eaeaea] max-sm:hidden'}>
                <Image src={popImage} alt={'pop devices'} width={0} height={0} className={''} />
                <div className={'p-10 flex flex-col gap-8'}>
                    <p className={'text-2xl font-semibold'}>Samsung Galaxy</p>
                    <p className={'text-[#656565]'}>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use</p>
                    <button className={'border-2 border-gray-700 h-[50px] w-[200px] px-12 rounded-sm cursor-pointer'}>Shop now</button>
                </div>
            </div>
            <div className={'w-full flex flex-col bg-[#2c2c2c] text-white max-sm:hidden'}>
                <Image src={popImage} alt={'pop devices'} width={0} height={0} className={''} />
                <div className={'p-10 flex flex-col gap-8'}>
                    <p className={'text-2xl font-semibold'}>Macbook Pro</p>
                    <p className={'text-white'}>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use</p>
                    <button className={'border-2 border-white h-[50px] w-[200px] px-12 rounded-sm cursor-pointer'}>Shop now</button>
                </div>
            </div>
        </div>
    );
};

export default Category;