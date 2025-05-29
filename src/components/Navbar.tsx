'use client';

import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useTranslations } from "next-intl";
import {CiHeart, CiLogout, CiSearch} from "react-icons/ci";
import { PiShoppingCartLight, PiUserCircleThin } from "react-icons/pi";

import messages from '@/messages/vi';
import NavLink from "@/components/common/nav-link";
import {Link, useRouter} from "@/i18n/navigation";
import {RootState} from "@/stores";
import {authActions, IAuthState} from "@/stores/actions/auth/authSlice";
import {useToken} from "@/hooks/useToken";
import {useFavorite} from "@/hooks/useFavorite";

const Navbar = () => {
    const t = useTranslations('home');
    const token = useSelector<RootState, IAuthState>(state => state.auth).token;
    const [isHidden, setIsHidden] = React.useState(true);
    const { clear } = useToken();
    const { get } = useFavorite();
    const router = useRouter();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authActions.clearToken());
        clear();
        router.push('/');
    }

    const handleDisplaySearchInput = () => {
        if (window.innerWidth > 640) {
            return;
        }

        setIsHidden(prev => !prev);
    }

    return (
        <div className='sticky top-0 z-50 bg-white w-full h-[80px] flex justify-center align-center border-b border-gray-300 max-sm:justify-between max-lg:px-4'>
            <div className='flex justify-between items-center h-full w-[1200px] text-[#bfbfbf] py-4 gap-12 '>
                <Link href={'/'} className={`text-3xl text-black max-md:order-2 ${isHidden ? undefined : 'max-sm:hidden'}`}>cyber</Link>
                <div className='flex gap-2 justify-between items-center bg-[#f3f3f3] h-full max-lg:w-fit w-[300px] sm:flex-grow rounded-sm px-4 max-md:order-1'>
                    <label htmlFor="search" ><CiSearch className='text-2xl text-[#636363] max-sm:cursor-pointer' onClick={handleDisplaySearchInput}/></label>
                    <input type="text" id='search' placeholder={t('nav.search')} className={`${!isHidden && 'max-sm:block'} focus:outline-none w-full text-[#636363] hidden md:block`}
                           autoComplete="none"/>
                </div>
                <div className='flex gap-13 max-sm:gap-4 max-md:order-3'>
                    <div className={'flex gap-11 text-[#a1a0a0] font-medium max-sm:hidden'}>
                        { Object.entries(messages.home.nav).map(( [key] ) => (
                            <NavLink key={key} href={`/${key}`}>{t(`nav.${key}`)}</NavLink>
                        )) }
                    </div>

                    <div className={''}>
                        <PiUserCircleThin className={'sm:hidden text-3xl text-black'}/>
                        <div className='flex gap-6 text-black font-medium h-full items-center text-2xl max-sm:flex-col max-sm:hidden'>
                            <div className={'relative'}>
                                <Link href={'/'} ><CiHeart /></Link>
                                <p className={'absolute text-[10px]/[14px] rounded-full top-[-4px] right-[-4px] h-[14px] w-[14px] bg-black/80 text-white text-center '}>{get?.length ?? 0}</p>
                            </div>
                            <Link href={'/'} ><PiShoppingCartLight /></Link>
                            { token ? <CiLogout onClick={handleLogout} className='cursor-pointer' /> : <Link href={'/auth?mode=login'} ><PiUserCircleThin /></Link> }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
