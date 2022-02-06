import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    marketplace: null
};

const marketplaceSlice = createSlice({
    name: "marketplace",
    initialState,
    reducers: {
        updateMarketplace(state, action: PayloadAction<any>) {
            const { marketplace } = action.payload;
            state.marketplace = marketplace;
        },
        createTrack(state, action: PayloadAction<any>) {
            const { marketplace } = state;
        }
    },
});

export const {
    updateMarketplace
} = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
