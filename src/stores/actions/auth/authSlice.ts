import { createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
    token?: string;
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: ""
    },
    reducers: {
        setToken: (state: IAuthState, { payload }: { payload: string }) => {
            console.log("Payload: ", payload);
            state.token = payload;
        },
        clearToken: (state: IAuthState) => {
            state.token = undefined;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;