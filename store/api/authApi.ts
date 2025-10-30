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
        createSmsVerification: builder.mutation<any, { phone: string }>({
            query: (body) => ({
                url: "auth/sms/create",
                method: "POST",
                body,
            }),
        }),
        validateSmsCode: builder.mutation<any, { phone: string; code: string }>({
            query: (body) => ({
                url: "auth/sms/validate",
                method: "POST",
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useCreateSmsVerificationMutation,
    useValidateSmsCodeMutation,
} = authApi;
