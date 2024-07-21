import React from 'react';
import DishItem from './DishItem';
import { Dish } from '../../types';
import {useAppDispatch} from "../../app/hooks.ts";
import {addDish} from "../../store/cartSlice.ts";

interface Props {
  dishes: Dish[];
  deleteDish: (id: string) => void;
}

const Dishes: React.FC<Props> = ({ dishes, deleteDish }) => {
  const dispatch = useAppDispatch()
  const addDishToCart = (dish:Dish)=>{
    dispatch(addDish(dish))
  }
  return (
    <>
      <h4>Dishes</h4>
      {dishes.map((dish) => (
        <DishItem
          key={dish.id}
          dish={dish}
          addToCart={() => addDishToCart(dish)}
          onDelete={() => deleteDish(dish.id)}
        />
      ))}
    </>
  );
};

export default Dishes;
