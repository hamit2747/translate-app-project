import { createSlice } from "@reduxjs/toolkit";
import { getLanguages, translateText } from "./actions/translateActions";

const initialState = {
    languages: [],
    isLoading: false,
    isError: false,
    //çeviri için state'ler
    trLoading: false,
    answer:'',
    trError:false,

}

export const translateSlice = createSlice({
    name:'translate',
    initialState,
    extraReducers:{
        //diller için
        [getLanguages.pending]: (state) =>{
            state.isLoading = true;
        },

        [getLanguages.fulfilled]: (state,action) =>{
            state.isLoading = false;
            state.languages = action.payload;
            state.isError = false;
        },

        [getLanguages.rejected]: (state) =>{
            state.isError = true;
            state.isLoading = false;
        },

        
        // çeviri için
        [translateText.pending]:(state) =>{
          state.trLoading=true;
        },
        
        [translateText.fulfilled]:(state,action) =>{
          state.answer =action.payload;
          state.trLoading = false;
          state.trError= false;
        },
        [translateText.rejected]:(state) =>{
          state.trError = true;
          state.trLoading = false;

        },
    

    },
    reducers:{
        clearAnswer: (state) =>{
            state.answer =''
        }
    }
})

export const {clearAnswer} = translateSlice.actions;

export default translateSlice.reducer