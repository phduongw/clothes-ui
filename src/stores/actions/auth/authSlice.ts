import {createSlice} from "@reduxjs/toolkit";

export interface IAuthState {
    token?: string;
    favoritesList?: string[];
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: "",
        favoritesList: []
    },
    reducers: {
        setToken: (state: IAuthState, { payload }: { payload: { token: string, favoriteList: string[] } }) => {
            state.token = payload.token;
            state.favoritesList = payload.favoriteList;
        },
        clearToken: (state: IAuthState) => {
            state.token = undefined;
            const favoriteListJson = localStorage.getItem('favoriteList');
            state.favoritesList =  favoriteListJson ? JSON.parse(favoriteListJson) as string[] : [];
        },
        setFavoriteList: (state: IAuthState, { payload }: { payload: string[] }) => {
            state.favoritesList = payload;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;