import { createSlice } from "@reduxjs/toolkit";
import { menuList } from "./menuThunk";

const menuSlice = createSlice({

   name:'menu',
   initialState:{
    error:"",
    loading:false,
    restaurantInfo: null,
    menuItems: []
   },
   extraReducers:(builder)=>{
      
              builder.addCase(menuList.pending,(state)=>{
                  state.loading = true;
                  state.error= "";
              }),
                 builder.addCase(menuList.fulfilled,(state,action)=>{
                  state.loading = false;
                  state.restaurantInfo = action.payload.restaurantInfo;
                  state.menuItems = action.payload.menuItems;
              }),
              builder.addCase(menuList.rejected,(state,action)=>{
                  state.loading = false;
                  state.error= action.payload;
              })
              
          }

})

export default menuSlice.reducer;