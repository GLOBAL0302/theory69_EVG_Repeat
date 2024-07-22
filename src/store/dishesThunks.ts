import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import {ApiDishes, Dish} from "../types.ts";
import {AppDispatch} from "../app/store.ts";
import {updateDishes} from "./cartSlice.ts";

export const fetchDishes = createAsyncThunk<Dish[], undefined, {dispatch:AppDispatch}>("dishes/fetchDishes",
    async(_args, thunkAPI)=>{
    const dishesResponse = await axiosApi.get<ApiDishes |null>("/dishes.json");
    const dishes = dishesResponse.data;
    let newDishes: Dish[] = [];
    if(dishes){
        newDishes = Object.keys(dishes).map((id:string)=>{
            const dish = dishes[id];
            return {
                id,
                ...dish,
            }
        });
    }

    thunkAPI.dispatch(updateDishes(newDishes))
    return newDishes
})

export const deleteDish = createAsyncThunk<void, string>("dishes/deleteDish",
    async(dishId)=>{
    await axiosApi.delete(`/dishes/${dishId}.json`)
    })
