import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/authy/AuhSlice";
const store = configureStore({
    reducer:{
        auth:authSlice
    }
})

export default store