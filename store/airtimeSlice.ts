import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AirtimeState {
    accountid_phone: string;
    category_name: string;
    product_id: string;
    product_name: string;
    amount: number;          // ✅ ahora es number, no string
    carrier_name: string;
    flow_type: string;
}

const initialState: AirtimeState = {
    accountid_phone: "",
    category_name: "",
    product_id: "",
    product_name: "",
    amount: 0,               // ✅ valor numérico inicial
    carrier_name: "",
    flow_type: "",
};

const airtimeSlice = createSlice({
    name: "airtime",
    initialState,
    reducers: {
        setAirtimeInformation: (state, action: PayloadAction<Partial<AirtimeState>>) => {
            return { ...state, ...action.payload };
        },
        resetAirtime: () => initialState,
    },
});

export const { setAirtimeInformation, resetAirtime } = airtimeSlice.actions;
export default airtimeSlice.reducer;
