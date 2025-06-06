import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        formData
      );
          
      if(response?.data?.success){
         const decodedUser = jwtDecode(response?.data?.token);
         localStorage.setItem("token", response?.data.token);
         return{
          user:decodedUser,
          message:response?.data?.message
         }

      }
    } catch (error) {
        if (error.response) {
        const status = error.response.status;
        if (status === 401) return rejectWithValue("Invalid password.");
        else if (status === 404) return rejectWithValue("User not found.");
        else if (status === 400) return rejectWithValue("Missing parameters.");
        else return rejectWithValue("Something went wrong. Try again.");
      } else {
        return rejectWithValue("Network error. Please try again later.");
      }
    }
  }
);

export default loginUser;