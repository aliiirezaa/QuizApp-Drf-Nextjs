import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState  = {
    accessToken:"",
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}

export const login = createAsyncThunk('auth/login', async (accessToken, thunkAPI) =>{
    try{
        const response = await axios.post('/api/auth/login',JSON.stringify(accessToken))
        if(response.status == 200){
            return response.data
        }
    }
    catch(error){
        let message = ""
        if (error?.response?.status == 500) {
          message = "خطایی در بخش سرور اتفاق افتاده است"
        }
        else if (error?.response?.status == 400) {
          message = error?.response?.data?.message || error?.response?.message || error.toString()
        }
        else if (error?.response?.status == 404) {
          message = error?.response?.data?.message || error?.response?.message || error.toString()
        }
        else if (error?.response?.status == 405) {
          message = `method ${error.response.status} not Allowed`
        }
        return thunkAPI.rejectWithValue(message)
    }
})

const authSlice = createSlice({
    name:"auth", 
    initialState,
    reducers:{
        reset(state){ 
            state.isLoading = false,
            state.isSuccess = false,
            state.isError = false,
            state.message = ""
           
        },

        logout(state){
            state.accessToken="",
            state.isLoading = false,
            state.isSuccess = false,
            state.isError = false,
            state.message = ""
        },
    },
    extraReducers(builder){
        builder 
            .addCase(login.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) =>{
                state.isLoading = false 
                state.isSuccess = true 
                state.accessToken = action.payload
            })
            .addCase(login.rejected, (state, action) =>{
                state.isLoading = false 
                state.isSuccess = false 
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset,logout} = authSlice.actions
export default authSlice.reducer