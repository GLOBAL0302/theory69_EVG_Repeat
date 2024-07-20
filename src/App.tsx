import { useCallback, useEffect, useState } from 'react';
import { ApiDishes, CartDish, Dish } from './types';
import Home from './containers/Home/Home';
import NewDish from './containers/NewDish/NewDish';
import { Route, Routes, useLocation } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Order/Order';
import axiosApi from './axiosApi';
import EditDish from './containers/EditDish/EditDish';
import Orders from './containers/Orders/Orders';
import Layout from './components/Layout/Layout';
import { toast } from 'react-toastify';

const App = () => {
  const location = useLocation();

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [cartDishes, setCartDishes] = useState<CartDish[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true);
      const { data: dishes } = await axiosApi.get<ApiDishes | null>(
        '/dishes.json',
      );

      if (!dishes) {
        setDishes([]);
      } else {
        const newDishes = Object.keys(dishes).map((id) => ({
          ...dishes[id],
          id,
        }));

        setDishes(newDishes);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCart = useCallback(() => {
    setCartDishes((cartDishes) => {
      return cartDishes.reduce<CartDish[]>((acc, cartDish) => {
        const existingDish = dishes.find(
          (dish) => dish.id === cartDish.dish.id,
        );

        if (existingDish) {
          acc.push({ ...cartDish, dish: existingDish });
        }

        return acc;
      }, []);
    });
  }, [dishes]);

  const clearCart = () => {
    setCartDishes([]);
  };

  useEffect(() => {
    updateCart();
  }, [updateCart]);

  const deleteDish = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete this dish?')) {
        await axiosApi.delete(`/dishes/${id}.json`);
        toast.success('Dish deleted!');
        await fetchDishes();
      }
    } catch (e) {
      toast.error('Could not delete this dish!');
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      void fetchDishes();
    }
  }, [fetchDishes, location]);

  const addDishToCart = (dish: Dish) => {
    setCartDishes((prevState) => {
      const existingIndex = prevState.findIndex((cartDish) => {
        return cartDish.dish.id === dish.id;
      });

      if (existingIndex === -1) {
        return [...prevState, { dish, amount: 1 }];
      } else {
        return prevState.map((cartDish, index) => {
          if (index === existingIndex) {
            return { ...cartDish, amount: cartDish.amount + 1 };
          }
          return cartDish;
        });
      }
    });
  };

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              dishesLoading={loading}
              dishes={dishes}
              addToCart={addDishToCart}
              cartDishes={cartDishes}
              deleteDish={deleteDish}
            />
          }
        />
        <Route path="/new-dish" element={<NewDish />} />
        <Route path="/checkout" element={<Checkout cartDishes={cartDishes} />}>
          <Route
            path="continue"
            element={<Order cartDishes={cartDishes} clearCart={clearCart} />}
          />
        </Route>
        <Route path="/edit-dish/:id" element={<EditDish />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<h1>Not found!</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
