import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    item:{}
}

export const itemSlice =  createSlice({
    name:"itemItem",
    initialState,
    reducers:{
        setitem:(state,action)=>{
             state.item = action.payload
             
        }   

    }
})

export const {setitem} =  itemSlice.actions



export default itemSlice.reducer
