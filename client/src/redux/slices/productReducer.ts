import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductsTS, ProductTS } from 'utils/types';
import { getProducts, URL_API } from '../../utils/api';

export interface cartState {
  products: ProductsTS[];
  isLoading: boolean;
  filteredItems: ProductsTS[];
  filterProducts: ProductsTS[];
  product: ProductTS[];
  hasError: boolean;
}

const initialState: cartState = {
  products: [],
  filteredItems: [],
  product: [] || '{}',
  filterProducts: [],
  isLoading: false,
  hasError: false,
};

export const fetchProductsByName = createAsyncThunk(
  'productsByName/get',
  async (name: string) => {
    try {
      const URL = `${URL_API}/product/findByName/${name}`;

      const response = await axios.get(URL);
      console.log(response);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getProduct = createAsyncThunk(
  'product/get',
  async (productId: any) => {
    try {
      const URL = `${URL_API}/product/${productId}`;
      const response = await axios.get(URL);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const productsFetch = createAsyncThunk('products/get', async () => {
  try {
    const response = await getProducts();
    return response.data;
  } catch (err) {
    console.error(err);
  }
});
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterCountry1: (state, action) => {
      const getCategory = state.products.filter(
        (item) => item.name === action.payload.name
      );
      console.log(getCategory);
    },

    filterProduct: (state, action: PayloadAction<string>) => {
      const listProducts = state.filterProducts.filter((x: any) => {
        return x.category === action.payload;
      });
      state.products = listProducts;

      console.log('Filter It', listProducts.length);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filterProducts = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      })

      .addCase(getProduct.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      })

      .addCase(fetchProductsByName.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchProductsByName.fulfilled, (state, action) => {
        state.filteredItems = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchProductsByName.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export const { filterProduct, filterCountry1 } = productsSlice.actions;

export default productsSlice.reducer;
