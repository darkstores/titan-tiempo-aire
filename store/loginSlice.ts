import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
            AsyncStorage.setItem("auth", JSON.stringify(action.payload)); // 🔹 guarda sesión
        },
        loadCredentials: (state, action: PayloadAction<UserData>) => {
            state.user = action.payload;
            state.token = action.payload.token;
        },
        clearAuth: (state) => {
            state.token = null;
            state.user = null;
            AsyncStorage.removeItem("auth"); // 🔹 borra sesión
        },
    },
});

export const { setCredentials, clearAuth, loadCredentials } = authSlice.actions;
export default authSlice.reducer;
