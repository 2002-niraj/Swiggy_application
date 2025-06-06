import { createSlice } from "@reduxjs/toolkit";
import restoList from "./restoThunk"

const restoSlice = createSlice({
      name:'list',
      initialState:{
        error:"",
        loading:false,
        restaurantList:null
      },

      extraReducers:(builder)=>{
      
              builder.addCase(restoList.pending,(state)=>{
                  state.loading = true;
                  state.error= "";
      
              }),
                 builder.addCase(restoList.fulfilled,(state,action)=>{
                  state.loading = false;
                  state.restaurantList= action.payload;
              }),
              builder.addCase(restoList.rejected,(state,action)=>{
                  state.loading = false;
                  state.error= action.payload;
              })
              
          }
})

export default restoSlice.reducer;