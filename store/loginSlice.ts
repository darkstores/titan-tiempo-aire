import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "./types";

interface AuthState {
    token: string | null;
    user: UserData | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<UserData>) => {
            state.user = action.payload;
            state.token = action.payload.token;
        },
        clearAuth: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;
