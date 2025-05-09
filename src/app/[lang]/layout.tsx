import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import React, {ReactNode} from "react";

export interface LayoutProps {
     lang: string
}

export default async function LocaleLayout({ children, params }: Readonly<{children: ReactNode, params: Promise<LayoutProps>}>) {
    // Ensure that the incoming `locale` is valid
    const { lang } = await params
    if (!hasLocale(routing.locales, lang)) {
        notFound();
    }

    return (
        <html lang={lang}>
            <body>
                <NextIntlClientProvider>{children}</NextIntlClientProvider>
            </body>
        </html>
    );
}