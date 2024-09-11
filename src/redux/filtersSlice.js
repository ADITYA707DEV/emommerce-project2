import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 priceRange: [""]
}

export const filtersSlice =  createSlice({
    name:"filtersPrice",
    initialState,
    reducers:{
        setFiltersPrice:(state,action)=>{
          
             state.priceRange = action.payload.priceRange
             
             
         
   
        }

    }
})

export const {setFiltersPrice} =  filtersSlice.actions

export default filtersSlice.reducer