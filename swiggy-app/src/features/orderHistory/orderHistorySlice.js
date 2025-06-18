import { createSlice } from "@reduxjs/toolkit";
import fetchOrderHistory from "./orderHistoryThunk";

const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState: {
    orders: [],     
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderHistory: (state) => {
      state.orders = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderHistory } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
