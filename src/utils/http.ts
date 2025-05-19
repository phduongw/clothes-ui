import { QueryClient } from "@tanstack/query-core";

export const getAccessToken = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
        return accessToken;
    }

    throw new Error("Access token not set");
}
export const queryClient = new QueryClient();