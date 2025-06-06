import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const registerUser = createAsyncThunk(
    "register/registerUser",
    async(formData,{ rejectWithValue })=>{

        try{
            const response = await axios.post('http://localhost:3001/api/signup',formData 
                ,
                  {
            validateStatus: (_) => true 
                 }  
            );
            if( response.data.status === 409){
                return response.data;
            }
            return response.data;
        }
        catch(error){
             
            if(error){
                  return rejectWithValue("Network error. Please try again later.");
            }
        }
    }
)

export default registerUser;