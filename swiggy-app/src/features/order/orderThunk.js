import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const placeOrders = createAsyncThunk(
  "order/placeOrder",
  async({token},{getState, rejectWithValue})=>{
     try{
       const state = getState();
       const orderPayload = {
        userId: state.login.user?.id,
        restaurantInfo: state.menu.restaurantInfo, 
        address: state.location.address,
        total: state.cart.total,
        items: state.cart.items
      };
      // in post url, body,headers
      const res = await axios.post("http://localhost:3001/api/order", 
        orderPayload,
              {

             headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      return res.data;
     }
     catch(error){
        return rejectWithValue(error.response?.data?.message || "Failed to place order");
     }
  }

);

export default placeOrders;