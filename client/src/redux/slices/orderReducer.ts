import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { OrderTS } from 'utils/types';

export interface orderState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: any;
  storeorder: OrderTS[];
}

const token = localStorage.getItem('user')
  ? localStorage.getItem('user')
  : null;

const initialState: orderState = {
  storeorder: [] || '{}',
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const confirmOrder2 = (data: any) => {
  console.log('products:', data.products);
};

export const confirmOrder = createAsyncThunk(
  'order/checkout',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/order/confirm',
        {
          fullname: data.personData.fullname,
          address: data.personData.address,
          city: data.personData.city,
          postalcode: data.personData.postalcode,
          country: data.personData.country,
          products: data.products,
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser1 = createAsyncThunk(
  'auth/register',
  async (useData: any, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // make request to backend
      const response = await axios.post(
        'http://localhost:4000/api/v1/users/signup',

        {
          username: useData.username,
          email: useData.email,
          password: useData.password,
        },
        config
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(confirmOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.storeorder = action.payload;
        toast.success('Order place successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })

      .addCase(confirmOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error('cannot placing order', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  },
});

export default orderSlice.reducer;
