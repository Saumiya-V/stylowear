import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import type { Item } from "@/types/type";


type cartItem = Item & {quantity:number}

const initialState: cartItem[] = []

 const cartSlice = createSlice({
  name:'Cart',
  initialState,
  reducers:{
    addToCart:(state,action:PayloadAction<Item>)=>{
       const existing = state.find((item)=>item.id === action.payload.id)
       if(existing){
          existing.quantity += 1;
       }
       else{
          state.push({...action.payload,quantity:1})
       }
        toast.success(existing?"Incremented item":"Added to cart")
      
    },
     removeFromCart:(state,action:PayloadAction<number>)=>{
        return state.filter((item)=>item.id !== action.payload)
     },
     incrementCartItem:(state,action:PayloadAction<{id:number}>)=>{
         const item = state.find(i=>i.id === action.payload.id)
         if(item){
            item.quantity += 1
         }
     },
     decrementCartItem:(state,action:PayloadAction<{id:number}>)=>{
      const item = state.find(i=>i.id === action.payload.id)
      if(item){
         if(item.quantity>1){
            item.quantity -=1
         }
         else{
            return state.filter(i=>i.id !== action.payload.id)
         }
      }
     }
  },
 

 })


 export const {addToCart,removeFromCart,incrementCartItem,decrementCartItem}=cartSlice.actions
 export default cartSlice.reducer