import { createSlice } from "@reduxjs/toolkit";
import {getLocationThunk} from "./locationThunk"

const locationSlice = createSlice({
  name: "location",
  initialState: {
    latitude: null,
    longitude: null,
    address: "",
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLocationThunk.fulfilled, (state, action) => {
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
        state.address = action.payload.address;
        state.loading = false;
      })
      .addCase(getLocationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to get location";
      });
  },
});

export default locationSlice.reducer;
