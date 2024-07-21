import {configureStore} from "@reduxjs/toolkit";
import {cartReducer} from "../store/cartSlice.ts";
import {dishesReducer} from "../store/dishesSlice.ts";


export const store = configureStore({
    reducer:{
        cart: cartReducer,
        dishes: dishesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// in hooks
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppSelector = useSelector.withTypes<RootState>()