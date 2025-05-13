'use client';

import React from 'react';
import { useTranslations } from "next-intl";

import messages from '@/messages/vi';
import NavLink from "@/components/common/nav-link";
import {Link} from "@/i18n/navigation";
import {CiHeart, CiSearch} from "react-icons/ci";
import {PiShoppingCartLight, PiUserCircleThin} from "react-icons/pi";

const Navbar = () => {
    const t = useTranslations('home');

    return (
        <div className='bg-white w-full h-[80px] flex justify-center align-center'>
            <div className='w-[1200px] flex justify-between items-center h-full text-[#bfbfbf] py-4 gap-12'>
                <Link href={'/'} className="text-3xl text-black">cyber</Link>
                <div className='flex gap-2 justify-between items-center bg-[#f3f3f3] h-full w-[300px] flex-grow rounded-xs px-4'>
                    <label htmlFor="search"><CiSearch className='text-2xl text-[#636363]'/></label>
                    <input type="text" id='search' placeholder={t('nav.search')} className='focus:outline-none w-full text-[#636363]'
                           autoComplete="none"/>
                </div>
                <div className='flex gap-13'>
                    <div className={'flex gap-11 text-[#a1a0a0] font-medium'}>
                        { Object.entries(messages.home.nav).map(( [key] ) => (
                            <NavLink key={key} href={`/${key}`}>{t(`nav.${key}`)}</NavLink>
                        )) }
                    </div>

                    <div className='flex gap-6 text-black font-medium h-full items-center text-2xl'>
                        <Link href={'/'} ><CiHeart /></Link>
                        <Link href={'/'} ><PiShoppingCartLight /></Link>
                        <Link href={'/auth'} ><PiUserCircleThin /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
