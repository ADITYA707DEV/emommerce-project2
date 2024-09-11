import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[],
    cartCount: 0,
    total:0,
    identity:1
}
    // cart: 0,
    // price:0,
    // clothingtype:[],
    // size:[]


export const cartSlice = createSlice({
    name:"userCart",
    initialState,
    reducers:{
        setCart: (state,action)=>{
       
            
            
            state.cartCount = state.cartCount + 1
            state.items = [...state.items,{...(action.payload),key:action.payload._id + state.identity}]
            state.identity = state.identity + 1
            state.total = state.total + parseInt(action.payload.price)
           
         
        },
        deleteCart: (state,action)=>{
            
            state.cartCount = state.cartCount - 1
           state.items = (state.items).filter((item)=>{
            return item.key !== action.payload.key
           })
           state.total = state.total - parseInt(action.payload.price)
        
        }

        // deleteCart: (state,action)=>{
        //     state.cart =  state.cart - 1,
        //     state.price = state.price - action.payload.price
        // }
    }
})

export const {setCart,deleteCart} = cartSlice.actions

export default cartSlice.reducer
