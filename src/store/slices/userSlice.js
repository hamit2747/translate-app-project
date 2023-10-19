import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[],
    isLoadaing: true,
    isError: false,
}


const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
})

export default userSlice.reducer