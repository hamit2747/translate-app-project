import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import  translateSlice  from "./translateSlice";



export default configureStore({
    reducer:{
        userSlice,
        translateSlice
    },
})