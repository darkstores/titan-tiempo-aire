import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../index";


export const baseQuery = fetchBaseQuery({
    // baseUrl: "https://apierp.familiatitan.com/",
    baseUrl: 'http://192.168.5.38:3000/',
    prepareHeaders: async (headers, { getState }) => {
        const { token } = (getState() as RootState).auth || {};
        // const token_device = await getValueFromStorage("@expo-push-token");

        if (token) {
            headers.set("authorization", token);
        }
        // if (token_device) {
        //     headers.set("token_device", token_device);
        // }

        headers.set("Content-Type", "application/json");
        return headers;
    },
});

// interceptor para manejar 401
const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (
        result.error &&
        (result.error.status === 401 ||
            (typeof result.error.data === "string" &&
                result.error.data.includes("Unauthorized")))
    ) {
        // api.dispatch(signOut());
    }
    return result;
};

// api base
export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReAuth,
    endpoints: () => ({}),
});
