import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { OrderTS, ProductsTS } from 'utils/types';

export interface adminState {
  isLoading: boolean;
  isError: boolean;
  listproducts: ProductsTS[];
  listorders: [];
}

const token = localStorage.getItem('user')
  ? localStorage.getItem('user')
  : null;

const initialState: adminState = {
  listproducts: [],
  listorders: [],
  isLoading: false,
  isError: false,
};

export const createProducts = createAsyncThunk(
  'admin/create',
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
        'http://localhost:4000/api/v1/product/',

        {
          name: useData.name,
          price: useData.price,
          description: useData.description,
          category: useData.category,
          images: useData.images,
          stock: useData.stock,
        },
        config
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const retrieveProducts = createAsyncThunk('admin/retrieve', async () => {
  const res = await axios.get('http://localhost:4000/api/v1/product');
  return res.data;
});

export const updateProducts = createAsyncThunk(
  'admin/update',

  async (useData: any, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // make request to backend
      const response = await axios.put(
        `http://localhost:4000/api/v1/product/${useData._id}`,

        {
          name: useData.name,
          price: useData.price,
          description: useData.description,
          category: useData.category,
          images: useData.images,
          stock: useData.stock,
        },
        config
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  'admin/delete',
  async (id: any) => {
    await axios.delete(`http://localhost:4000/api/v1/product/${id}`);
    return { id };
  }
);

export const retrieveOrder = createAsyncThunk(
  'admin/retrieveOrder',
  async () => {
    const res = await axios.get('http://localhost:4000/api/v1/order');
    return res.data;
  }
);

export const deleteOrders = createAsyncThunk(
  'admin/deleteOrders',
  async (id: any) => {
    await axios.delete(`http://localhost:4000/api/v1/order/${id}`);
    return { id };
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createProducts.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success('Product added successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(retrieveProducts.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(retrieveProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listproducts = action.payload;
      })
      .addCase(retrieveProducts.rejected, (state, { payload }) => {
        state.isError = true;
        state.isLoading = false;
        toast.error('Error in retrieving products', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .addCase(deleteProducts.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(deleteProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success('Products deleted successfully', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateProducts.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(updateProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })

      .addCase(updateProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(retrieveOrder.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(retrieveOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listorders = action.payload;
      })
      .addCase(retrieveOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteOrders.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(deleteOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success('Orders deleted successfully', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .addCase(deleteOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default adminSlice.reducer;
