import {Dish} from "../types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {deleteDish, fetchDishes} from "./dishesThunks.ts";



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

    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchDishes.pending, state => {
            state.fetchLoading = true;
        })
            .addCase(fetchDishes.fulfilled, (state,{payload:items})=>{
                state.fetchLoading = false;
                state.items = items;
            })
            .addCase(fetchDishes.rejected, state=>{
                state.fetchLoading = false;
            })
        builder
            .addCase(deleteDish.pending, (state, {meta:{arg: DishId}}) => {
                state.deleteLoading = DishId;
            })
            .addCase(deleteDish.fulfilled, (state)=>{
                state.fetchLoading = false;
            })
            .addCase(deleteDish.rejected, (state)=>{
                state.deleteLoading = false;
            })
    },
    selectors:{
        selectDishes: state => state.items,
        selectFetchDishesLoading: state => state.fetchLoading,
        selectDeleteDishLoading:state => state.deleteLoading
    }

})
export const dishesReducer = dishesSlice.reducer
export const {
    selectDeleteDishLoading,
    selectDishes,
    selectFetchDishesLoading} = dishesSlice.selectors