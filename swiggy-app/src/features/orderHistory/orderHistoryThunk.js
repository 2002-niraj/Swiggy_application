
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchOrderHistory = createAsyncThunk(
  "orderHistory/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/orders/${userId}`
      );

      return response.data?.data?.orderDetails || [];
    } catch (err) {
    
      const message =
        err.response?.data?.message || err.message || "Failed to fetch orders";
      return rejectWithValue(message);
    }
  }
);

export default fetchOrderHistory;
