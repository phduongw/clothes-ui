import { useTranslations } from 'next-intl';
import { Link } from "@/i18n/navigation";

export default function HomePage() {
    const t = useTranslations('home');
    return (
        <div>
            <h1>{t('title')}</h1>
            <p>{t('content')}</p>
            <Link href='/about'>About</Link>
        </div>
    );
}