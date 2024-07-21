import React from 'react';
import Dishes from '../../components/Dishes/Dishes';
import Cart from '../../components/Cart/Cart';
import {Dish } from '../../types';
import Spinner from '../../components/Spinner/Spinner';

interface Props {
  dishesLoading: boolean;
  dishes: Dish[];
  deleteDish: (id: string) => void;
}

const Home: React.FC<Props> = ({
  dishesLoading,
  dishes,
  deleteDish,
}) => {
  return (
    <div className="row mt-2">
      <div className="col-7">
        {dishesLoading ? (
          <Spinner />
        ) : (
          <Dishes
            dishes={dishes}
            deleteDish={deleteDish}
          />
        )}
      </div>
      <div className="col-5">
        <Cart/>
      </div>
    </div>
  );
};

export default Home;
