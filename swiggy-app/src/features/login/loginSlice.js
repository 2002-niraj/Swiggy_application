import { createSlice } from "@reduxjs/toolkit";
import loginUser from "./loginThunk";

const loginSlice = createSlice({

    name:"auth",
    initialState:{
        user:null,
        token:null,
        error:"",
        loginMessage : ""
        
    },
    reducers:{
        logout:(state)=>{
             state.user = null;
             state.token = null;
            localStorage.removeItem("user");
        },
        clearLoginError:(state)=>{
           state.error = null,
           state.loginMessage = null
        }
    },
    extraReducers:(builder)=>{

        builder.addCase(loginUser.pending,(state)=>{
            state.error= "";

        }),
           builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.user= action.payload.user;
            state.token = action.payload.token;
            state.loginMessage = action.payload.message;
        }),
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.error= action.payload;
        })
        
    }
    
});

export const {logout, clearLoginError} = loginSlice.actions;
export default loginSlice.reducer