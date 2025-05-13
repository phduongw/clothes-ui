'use client';

import React, {FC, ReactNode} from 'react';
import { usePathname, Link } from "@/i18n/navigation";

const NavLink: FC<{ children: ReactNode, href: string }> = ({ children, href }) => {
    const path = usePathname();

    return (
        <Link href={href === '/home' ? '/' : href} className={`${path.startsWith(href) || (href === '/home' && path === '/') ? 'text-black font-medium' : ''}`} >
            {children}
        </Link>
    );
};

export default NavLink;
