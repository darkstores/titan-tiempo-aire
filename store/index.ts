import { configureStore } from "@reduxjs/toolkit";
import airtimeReducer from "./airtimeSlice";
import authReducer from "./loginSlice";
import { api } from "./api/baseApi";

export const store = configureStore({
    reducer: {
        airtime: airtimeReducer,
        auth: authReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
