import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsSlice from './slices/productReducer';
import cartSlice from './slices/cartReducer';
import usersSlice from './slices/authReducer';
import orderSlice from './slices/orderReducer';
import adminSlice from './slices/adminReducer';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    auth: usersSlice,
    order: orderSlice,
    admin: adminSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
