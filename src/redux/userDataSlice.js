import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 data:{
    
 }
}

export const userDataSlice =  createSlice({
    name:"userData",
    initialState,
    reducers:{
        setCookieData:(state,action)=>{
          
             state.data = action.payload
           
         
   
        },
        resetCart: (state,action)=>{
            return initialState
          }

    }
})

export const {setCookieData,resetCart} =  userDataSlice.actions

export default userDataSlice.reducer