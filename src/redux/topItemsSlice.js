import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 topItems:[]
}

export const topItemsSlice =  createSlice({
    name:"topItems",
    initialState,
    reducers:{
        setTopItems:(state,action)=>{
          
             state.topItems = action.payload
         
   
        }   

    }
})

export const {setTopItems} =  topItemsSlice.actions

export default topItemsSlice.reducer