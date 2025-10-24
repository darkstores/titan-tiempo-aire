// store/api/airtimeApi.ts
import { api } from "./baseApi";

export const airtimeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // ✅ Saldo (QUERY, no mutation)
        getAirtimeAccountBalance: builder.query<any, void>({
            query: () => ({
                url: "emida/get-airtime-balance",
                method: "POST",
            }),
        }),

        // Categorías
        getAirtimeCategories: builder.mutation<any, { flowType: string }>({
            query: (body) => ({
                url: "emida/get-airtime-categories",
                method: "POST",
                body,
            }),
        }),

        // Subcategorías
        getAirtimeSubcategories: builder.mutation<any, { category: string }>({
            query: (body) => ({
                url: "emida/get-airtime-subcategories",
                method: "POST",
                body,
            }),
        }),

        // Carriers
        getAirtimeCarriers: builder.mutation<any, { category: string; flowType: string }>(
            {
                query: (body) => ({
                    url: "emida/get-airtime-carrier",
                    method: "POST",
                    body,
                }),
            }
        ),

        // Productos
        getAirtimeProducts: builder.mutation<any, { carrier: string; category: string; flowType: string }>({
            query: (body) => ({
                url: "emida/get-airtime-products",
                method: "POST",
                body,
            }),
        }),


        // Transaction detail
        getAirtimeDetail: builder.mutation<any, { transaction_id: string }>({
            query: (body) => ({
                url: "emida/get-airtime-detail",
                method: "POST",
                body,
            }),
        }),

        // ✅ Transacciones (QUERY, no mutation)
        getAirtimeAll: builder.query<any, void>({
            query: () => ({
                url: "emida/get-airtime-all",
                method: "POST",
            }),
        }),

        // Aplicar recarga
        applyAirtime: builder.mutation<any, { phone: string; product_id: string }>({
            query: (body) => ({
                url: "emida/apply",
                method: "POST",
                body,
            }),
        }),

        // Crear recarga
        createAirtime: builder.mutation<any, { product_id: string; carrier_name: string; product_name: string; accountid_phone: string; amount: number; flowType: string }>({
            query: (body) => ({
                url: "emida/create-airtime",
                method: "POST",
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAirtimeAccountBalanceQuery,
    useGetAirtimeCategoriesMutation,
    useGetAirtimeCarriersMutation,
    useGetAirtimeProductsMutation,
    useGetAirtimeDetailMutation,
    useGetAirtimeAllQuery,
    useApplyAirtimeMutation,
    useCreateAirtimeMutation,
    useGetAirtimeSubcategoriesMutation
} = airtimeApi;
