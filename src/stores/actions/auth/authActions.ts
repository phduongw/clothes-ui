import { AppDispatch } from "@/stores";
import {authActions} from "@/stores/actions/auth/authSlice";


export const reviseFavourite = (productIdList: string[]) => {
    return async ( dispatch: AppDispatch) => {
        dispatch(authActions.setFavoriteList(productIdList));
    }
}