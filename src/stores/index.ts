import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/stores/actions/auth/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;