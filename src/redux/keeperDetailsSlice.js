import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    details:{}
}

export const keeperDetailsSlice =  createSlice({
    name:"keeperDetails",
    initialState,
    reducers:{
        setKeeperDetails:(state,action)=>{
          
     
             state.details = action.payload.details
             state.categoryimg = action.payload.categoryimg
             
        
            }
            
      
        }   

    
})

export const {setKeeperDetails} =  keeperDetailsSlice.actions



export default keeperDetailsSlice.reducer