import React from 'react';
import {useTranslations} from "next-intl";

const AboutPage = () => {
    const t = useTranslations('about');
    return (
        <div>
            {t('content')}
        </div>
    );
};

export default AboutPage;
