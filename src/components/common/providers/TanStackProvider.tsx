'use client';

import React, {FC, ReactNode} from 'react';
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/utils/http";

const TanStackProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default TanStackProvider;
