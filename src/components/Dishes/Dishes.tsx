import React, {useEffect} from 'react';
import DishItem from './DishItem';
import { Dish } from '../../types';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addDish} from "../../store/cartSlice.ts";
import {selectDeleteDishLoading, selectDishes, selectFetchDishesLoading} from "../../store/dishesSlice.ts";
import {deleteDish, fetchDishes} from "../../store/dishesThunks.ts";
import Spinner from "../Spinner/Spinner.tsx";



const Dishes: React.FC= () => {
  const dishes = useAppSelector(selectDishes);
  const deleteLoading = useAppSelector(selectDeleteDishLoading)
  const dispatch = useAppDispatch()
  const dishesLoading = useAppSelector(selectFetchDishesLoading)


  const addDishToCart = (dish:Dish)=>{
    dispatch(addDish(dish))
  }


  const removeDish = async (dishId:string)=>{
    await dispatch(deleteDish(dishId))
    await dispatch(fetchDishes())
  }

  useEffect(() => {
    dispatch(fetchDishes());

  }, [dispatch]);

  return (
    <>
      <h4>Dishes</h4>
      {dishesLoading?<Spinner/>: dishes.map((dish) => (
        <DishItem
          key={dish.id}
          dish={dish}
          addToCart={()=>addDishToCart(dish)}
          onDelete={() => removeDish(dish.id)}
          deleteLoading={deleteLoading}
        />
      ))}
    </>
  );
};

export default Dishes;
