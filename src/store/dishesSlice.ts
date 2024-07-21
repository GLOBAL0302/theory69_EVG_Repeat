import {Dish} from "../types.ts";
import {createSlice} from "@reduxjs/toolkit";

export interface DishesState {
    items:Dish[];
    fetchLoading:boolean;
    deleteLoading: false | string;
}

const initialState:DishesState = {
    items:[],
    fetchLoading:false,
    deleteLoading:false,
}

export const dishesSlice = createSlice({
    name:"dishes",
    initialState,
    reducers:{

    }

})
export const dishesReducer = dishesSlice.reducer