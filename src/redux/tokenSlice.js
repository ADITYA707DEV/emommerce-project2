import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
    authorised:false
}

export const tokenSlice =  createSlice({
    name:"userToken",
    initialState,
    reducers:{
        setToken:(state,action)=>{
             
             state.authorised = action.payload
        },
        resetKeeper:(state)=>{
          
            return initialState
        }

    },
    
})

export const {setToken,resetKeeper} =  tokenSlice.actions

export default tokenSlice.reducer