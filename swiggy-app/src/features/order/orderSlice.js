import { createSlice } from "@reduxjs/toolkit";

import placeOrders from "./orderThunk";

const orderSlice = createSlice({

    name: "order",
  initialState: {
    loading: false,
    orderId: null,
    success: false,
    message: "",
    error: null
  },
  reducers: {
    clearOrderState: (state) => {
      state.loading = false;
      state.orderId = null;
      state.success = false;
      state.message = "";
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(placeOrders.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.message = "";
        state.error = null;
      })
      .addCase(placeOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderId = action.payload.orderId;
        state.message = action.payload.message || "Order placed successfully!";
      })
      .addCase(placeOrders.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message || "Order placement failed!";
      });
  }
})

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;