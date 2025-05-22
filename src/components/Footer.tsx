import React from 'react';
import Image from "next/image";

import logo from '@/public/assets/logo.jpg'

const Footer = () => {
    return (
        <div className={'mt-16 w-full min-h-70 py-6 bg-black flex text-white'}>
            <div className={'w-[1200px] flex justify-between items-center mx-auto gap-12'}>
                <div className={'flex-1 flex flex-col gap-5'}>
                    <div className={'self-start flex justify-center items-center'}>
                        <Image src={logo} alt={'logo'} width={0} height={0} className={'w-[auto] h-[40px] ml-[-8px]'} unoptimized priority/>
                        <p className={'font-bold'}>Cyber</p>
                    </div>
                    <p className={'text-sm max-w-[430px]'}>We are a residential interior design firm located in Viet Nam. Our boutique-studio offer more than</p>
                </div>
                <div className={'flex-1 flex justify-between text-sm gap-3'}>
                    <div>
                        <h1 className={'font-medium text-xl mb-3'}>Service</h1>
                        <p>Bonus Program</p>
                        <p>Gift Cards</p>
                        <p>Credit and payment</p>
                        <p>Service contracts</p>
                    </div>

                    <div>
                        <h1 className={'font-medium text-xl mb-3'}>Assistance to the Buyer</h1>
                        <p>Find an order</p>
                        <p>Terms of delivery</p>
                        <p>Exchange and return of goods</p>
                        <p>Guarantee</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
