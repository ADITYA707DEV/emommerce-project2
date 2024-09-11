import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cardtype:{
        priceRange:undefined
    }
}

export const cardTypeSlice =  createSlice({
    name:"cardType",
    initialState,
    reducers:{
        setCardType:(state,action)=>{

             state.cardtype = action.payload.cardType
              if(state.cardtype.priceRange !== undefined){

                state.cardtype.priceRange = (action.payload.cardType.priceRange).split("-")
          
              }
             
   
        },
        resetCardType :()=>{
          return initialState
        }   

    }
})

export const {setCardType,resetCardType} =  cardTypeSlice.actions

export default cardTypeSlice.reducer