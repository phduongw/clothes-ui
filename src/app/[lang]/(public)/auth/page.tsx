import React, {FC} from 'react';

import {AuthMode, SearchParamsLogin} from "@/types/searchParamsLogin";
import {notFound} from "next/navigation";

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
        <div>
            <h1>Login Page</h1>
            <p>Mode: {mode}</p>
        </div>
    );
};

export default AuthenticationPage;
