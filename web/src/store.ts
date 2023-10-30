import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
