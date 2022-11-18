import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { toast } from 'react-toastify';
import { ProductsTS } from '../../utils/types';

export interface cartState {
  inCart: ProductsTS[];
  inTotal: ProductsTS[];
  inFavorites: ProductsTS[];
  isLoading: boolean;
}

const initialState: cartState = {
  inCart: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') || '{}')
    : [],
  inFavorites: localStorage.getItem('favorites')
    ? JSON.parse(localStorage.getItem('favorites') || '{}')
    : [],
  isLoading: false,
  inTotal: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    favorites: (state, { payload }) => {
      const index = state.inFavorites.findIndex(
        (i: any) => i._id === payload._id
      );

      if (index === -1) {
        state.inFavorites.push(payload);
        localStorage.setItem('favorites', JSON.stringify(state.inFavorites));
      } else {
        //   isLoading: payload.isLoading
        state.isLoading = false;
      }
    },

    add_v1: (state, action) => {
      const itemInCart = state.inCart.find(
        (item) => item._id === action.payload._id
      );
      if (itemInCart) {
        itemInCart.cartQuantity++;
      } else {
        state.inCart.push({ ...action.payload, cartQuantity: 1 });
      }
    },

    add: (state, action) => {
      const index = state.inCart.findIndex(
        (item) => item.name === action.payload.name
      );
      if (index >= 0) {
        state.inCart[index] = {
          ...state.inCart[index],
          cartQuantity: state.inCart[index].cartQuantity + 1,

          // total: state.inCart[index].price * state.inCart[index].cartQuantity,
        };
      } else {
        const addQuantity = { ...action.payload, cartQuantity: 1 };

        state.inCart.push(addQuantity);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.inCart));

      toast.success('Item added to the cart', {
        position: toast.POSITION.TOP_RIGHT,
      });
    },

    plus: (state, action) => {
      const itemIndex = state.inCart.findIndex(
        (item) => item.name === action.payload.name
      );

      if (itemIndex > -1) {
        state.inCart[itemIndex].cartQuantity += 1;
      } else if (state.inCart[itemIndex].cartQuantity === 1) {
        const plusCartItems = state.inCart.filter(
          (item) => item.name !== action.payload.name
        );

        state.inCart = plusCartItems;
      }
    },
    minus: (state, action) => {
      const mIndex = state.inCart.findIndex(
        (item) => item.name === action.payload.name
      );

      if (mIndex > -1) {
        state.inCart[mIndex].cartQuantity -= 1;
      }

      if (state.inCart[mIndex].cartQuantity === -1) {
        const minusCartItems = state.inCart.filter(
          (item) => item.name !== action.payload.name
        );
        state.inCart = minusCartItems;
      }
    },

    remove: (state, action: any) => {
      const index = state.inCart.findIndex(
        (item: any) => item.name === action.payload
      );
      state.inCart.splice(index, 1);
    },
    resetCart: (state) => {
      state.inCart = [];
    },
  },
});

export const { add, remove, plus, minus, resetCart, favorites } =
  cartSlice.actions;
export default cartSlice.reducer;
