import {useMutation} from "@tanstack/react-query";
import {reviseFavorite} from "@/utils/api/product";
import React from "react";
import {reviseFavourite} from "@/stores/actions/auth/authActions";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/stores";
import {IAuthState} from "@/stores/actions/auth/authSlice";


export const useFavorite = () => {
    const { token, favoritesList } = useSelector<RootState, IAuthState>(state => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    const { data, mutate } = useMutation({
        mutationFn: async ({ productId, action, accessToken }: {productId: string, action: 'add' | 'remove', accessToken: string}) => await reviseFavorite(productId, action, accessToken)
    });

    const handleRevisingFavorite = (e: React.MouseEvent<SVGElement | HTMLButtonElement>, productId: string, action: 'add' | 'remove') => {
        e.preventDefault();
        e.stopPropagation();
        let response: string[] = [];
        console.log("Token is: ", token);
        if (token) {
            console.log("Call mutate")
            mutate({ productId, action, accessToken: token });
        } else {
            const favoriteListStorage = localStorage.getItem('favoriteList');
            response = favoriteListStorage ? JSON.parse(favoriteListStorage) as string[] : [];
            if (action === 'add') {
                response.push(productId);
            } else {
                response = response.filter(ele => ele !== productId);
            }

            localStorage.setItem('favoriteList', JSON.stringify(response));
            dispatch(reviseFavourite(response))
            //Test commit
        }
    }

    if (data) {
        dispatch(reviseFavourite(data))
    }

    return { get: favoritesList, modify: {fn: handleRevisingFavorite, data} }
}