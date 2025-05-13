import {AppDispatch} from "@/stores";
import {authActions} from "@/stores/actions/auth/authSlice";

export const loginAction = (token: string) => {
    return (dispatch: AppDispatch) => dispatch(authActions.setToken(token));
}