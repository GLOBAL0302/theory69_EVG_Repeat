import {CartDish, Dish} from "../types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CartState {
    cartDishes:CartDish[],
}

const initialState:CartState={
    cartDishes: []
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addDish:(state, {payload:dish}:PayloadAction<Dish>)=>{
            const index = state.cartDishes.findIndex(cartDish => cartDish.dish.id === dish.id);

            if(index != -1){
                state.cartDishes[index].amount++;
            }else{
                state.cartDishes.push({
                    dish,
                    amount : 1
                });
            }
        },
        updateDishes:(state, {payload:dishes}:PayloadAction<Dish[]>)=>{
          const newCartDishes:CartDish[] = [];
          state.cartDishes.forEach((cartDish:CartDish)=>{
              const existingDish = dishes.find((dish)=> cartDish.dish.id === dish.id);
              if(!existingDish){
                  return
              }
              newCartDishes.push({
                  ...cartDish,
                  dish: existingDish
              });
          })

            state.cartDishes = newCartDishes;
        },
        clearCart:(state)=>{
            state.cartDishes=[];
        }

    },
    selectors:{
        selectCartDishes : state => state.cartDishes,
    }
})

export const cartReducer= cartSlice.reducer
export const {addDish,
    updateDishes
    , clearCart } = cartSlice.actions;
export const {selectCartDishes} = cartSlice.selectors