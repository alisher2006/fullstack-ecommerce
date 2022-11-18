import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface authState {
  token: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: any;
  username: string;
  isAuthenticated: boolean;
}

const token = localStorage.getItem('user')
  ? localStorage.getItem('user')
  : null;

const initialState: authState = {
  token: '',
  username: '',
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  isAuthenticated: true,
};

export const LoginUser = createAsyncThunk(
  'auth/login',
  async (authData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/users/login',
        {
          username: authData.uname,
          password: authData.password,
        }
      );
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
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

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
  window.location.reload();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      console.log('action.payload:', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.username = payload.username;
        if (state.username === 'admin') {
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      })

      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error('Invalid username / password', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .addCase(registerUser.pending, (state, { payload }) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success('Registered successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isError = true;
        state.isLoading = false;
        state.message = payload;
        toast.error('username already register', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isSuccess = false;
      });
  },
});

export default authSlice.reducer;
