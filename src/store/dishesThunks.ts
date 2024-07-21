import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import {ApiDishes, Dish} from "../types.ts";

export const fetchDishes = createAsyncThunk<Dish[]>("dishes/fetchDishes",
    async()=>{
    const dishesResponse = await axiosApi.get<ApiDishes |null>("/dishes.json");
    const dishes = dishesResponse.data;
    if(!dishes){
        return[]
    }
    return Object.keys(dishes).map((id:string)=>{
        const dish = dishes[id];
        return {
            id,
            ...dish,
        }
    });
})

export const deleteDish = createAsyncThunk("dishes/deleteDish",
    async(dishId)=>{
    await axiosApi.delete(`/dishes/${dishId}.json`)
    })