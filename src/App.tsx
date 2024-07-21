import {useCallback, useEffect, useState} from 'react';
import {ApiDishes, Dish} from './types';
import Home from './containers/Home/Home';
import NewDish from './containers/NewDish/NewDish';
import {Route, Routes, useLocation} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Order/Order';
import axiosApi from './axiosApi';
import EditDish from './containers/EditDish/EditDish';
import Orders from './containers/Orders/Orders';
import Layout from './components/Layout/Layout';
import {toast} from 'react-toastify';
import {useAppDispatch} from "./app/hooks.ts";
import {updateDishes} from "./store/cartSlice.ts";

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch()

  const [dishes, setDishes] = useState<Dish[]>([]);
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
        dispatch(updateDishes(newDishes));
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch]);



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



  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              dishesLoading={loading}
              dishes={dishes}
              deleteDish={deleteDish}
            />
          }
        />
        <Route path="/new-dish" element={<NewDish />} />
        <Route path="/checkout" element={<Checkout/>}>
          <Route
            path="continue"
            element={<Order/>}
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
