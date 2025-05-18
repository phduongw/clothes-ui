import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import React, {ReactNode} from "react";
import {AntdRegistry} from "@ant-design/nextjs-registry";

import Navbar from "@/components/Navbar";
import '../globals.css';

import {AR_One_Sans} from 'next/font/google'
import TanStackProvider from "@/components/common/providers/TanStackProvider";
import ReduxProvider from "@/components/common/providers/ReduxProvider";

export interface LayoutProps {
    lang: string
}

const arOneSans = AR_One_Sans({
    subsets: ['latin', 'vietnamese']
});

export default async function LocaleLayout({children, params}: Readonly<{
    children: ReactNode,
    params: Promise<LayoutProps>
}>) {
    // Ensure that the incoming `locale` is valid
    const {lang} = await params
    if (!hasLocale(routing.locales, lang)) {
        notFound();
    }

    return (
        <TanStackProvider>
            <html lang={lang} className={arOneSans.className}>
                <body>
                    <ReduxProvider>
                        <NextIntlClientProvider>
                            <AntdRegistry>
                                <Navbar/>
                                {children}
                            </AntdRegistry>
                        </NextIntlClientProvider>
                    </ReduxProvider>
                </body>
            </html>
        </TanStackProvider>
    );
}