import React, {FC, ReactNode} from 'react';

const SpecificationItem: FC<{ title: string, info: string, children: ReactNode }>= ({ info, title, children }) => {
    return (
        <div className={'flex items-center bg-[#f4f4f4] gap-3 px-4 py-2 rounded-[8px] min-w-[180px]'}>
            {children}
            <div className={'flex flex-col'}>
                <p className={'text-[#dbdbdb] text-sm'}>{title}</p>
                <p className={'text-sm'}>{info}</p>
            </div>
        </div>
    );
};

export default SpecificationItem;
