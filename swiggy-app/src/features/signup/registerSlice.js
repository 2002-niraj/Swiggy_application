import { createSlice } from "@reduxjs/toolkit";
import registerUser from "./registerThunk";
const registerSlice = createSlice({
    name:"register",
    initialState:{
        user: null,
        success: false,
        message: ""
    },

    reducers:{

        clearRegisterMessage:(state)=>{
            state.message = "";
        }

    },
    extraReducers:(builder)=>{
       builder
      .addCase(registerUser.pending, (state) => {
      state.success = false;
      state.message = null; 
      })
      .addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.success =  action.payload.success;
      state.message = action.payload.message 
      })
      .addCase(registerUser.rejected, (state, action) => {
      state.success = false;
      state.message = action.payload || 'Registration failed';
      });
    }
})


export const {clearRegisterMessage} = registerSlice.actions;
export default registerSlice.reducer;