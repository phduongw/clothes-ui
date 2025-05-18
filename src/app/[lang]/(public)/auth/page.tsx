import React, { FC } from 'react';

import {AuthMode, SearchParamsLogin} from "@/types/searchParamsLogin";
import {notFound} from "next/navigation";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginForm from "@/components/auth/LoginForm";

const AuthenticationPage: FC<{ searchParams: Promise<SearchParamsLogin> }> = async ({ searchParams }) => {
    const modeQuery = (await searchParams).mode;

    let mode: AuthMode;
    const validQuery: [AuthMode, AuthMode] = ['login', 'register'];
    if (modeQuery && validQuery.includes(modeQuery)) {
        mode = modeQuery;
    } else {
        notFound()
    }

    const content = mode === 'login' ? <LoginForm /> : <RegisterForm />

    return <div>
        {content}
    </div>;
};

export default AuthenticationPage;
