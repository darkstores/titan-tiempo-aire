import { LoginResponse, LoginRequest } from "../types";
import { api } from "./baseApi";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "auth/loginClient",
                method: "POST",
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation } = authApi;