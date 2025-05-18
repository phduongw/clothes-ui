import {LuSmartphone} from "react-icons/lu";
import {TbDeviceWatchStats} from "react-icons/tb";
import {MdOutlineCameraAlt} from "react-icons/md";
import {FaHeadphonesAlt} from "react-icons/fa";
import {useTranslations} from "next-intl";

export default function HomePage() {
    const t = useTranslations('home');

    return (
        <div className={'flex justify-center flex-col items-center bg-[#fafafa]'}>
            <div className={'w-[1200px] pt-12 pb-16'}>
                <h1 className={'mb-8 text-2xl font-medium'}>Browse By Category</h1>
                <div className={'flex justify-around items-center'}>
                    <div className={'flex flex-col gap-2 items-center justify-center w-[200px] h-[150px] bg-[#ededed] rounded-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-[#b7b6b6] hover:scale-110'}>
                        <LuSmartphone className={'text-5xl'} />
                        <p className={'font-medium'}>{t('phones')}</p>
                    </div>
                    <div className={'flex flex-col gap-2 items-center justify-center w-[200px] h-[150px] bg-[#ededed] rounded-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-[#b7b6b6] hover:scale-110'}>
                        <TbDeviceWatchStats className={'text-5xl'} />
                        <p>{t('smartsWatches')}</p>
                    </div>
                    <div className={'flex flex-col gap-2 items-center justify-center w-[200px] h-[150px] bg-[#ededed] rounded-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-[#b7b6b6] hover:scale-110'}>
                        <MdOutlineCameraAlt className={'text-5xl'} />
                        <p>{t('cameras')}</p>
                    </div>
                    <div className={'flex flex-col gap-2 items-center justify-center w-[200px] h-[150px] bg-[#ededed] rounded-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-[#b7b6b6] hover:scale-110'}>
                        <FaHeadphonesAlt className={'text-5xl'} />
                        <p>{t('headPhone')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}