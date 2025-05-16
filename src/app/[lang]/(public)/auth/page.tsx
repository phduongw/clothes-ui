import React, { FC } from 'react';

import {AuthMode, SearchParamsLogin} from "@/types/searchParamsLogin";
import {notFound} from "next/navigation";
import RegisterForm from "@/components/RegisterForm";
import {LayoutProps} from "@/app/[lang]/layout";

const AuthenticationPage: FC<{ searchParams: Promise<SearchParamsLogin> }> = async ({ searchParams }) => {
    const modeQuery = (await searchParams).mode;

    let mode;
    // console.log("Auth Mode first: ", AuthMode[0])
    const validQuery: [AuthMode, AuthMode] = ['login', 'register'];
    if (modeQuery && validQuery.includes(modeQuery)) {
        mode = modeQuery;
    } else {
        notFound()
    }

    return (
        <RegisterForm />
    );
};

export default AuthenticationPage;
