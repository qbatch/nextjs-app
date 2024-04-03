import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosBaseUrl, setAuthToken } from '../../config/axios-configuration';

const axios = axiosBaseUrl();

interface User {
  email?: string;
  password?: string;
  username?: string;
  token?: string;
}

export const UserRegistration = createAsyncThunk(
  'user/userRegistration',
  async (user: User, thunkAPI) => {
    try {
      const {
        username,
        email,
        password
      } = user;
      const response = await axios.post('auth/sign-up', {
        username,
        email,
        password
      });
      return response.data;
    } catch (err: any) {
      // throw error;
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status
        });
      }
      return thunkAPI.rejectWithValue({
        err: {
          error: 'Network Error'
        }
      });
    }
  }
);

export const ForgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (user: User, thunkAPI) => {
    try {
      const { email } = user;
      const response = await axios.post('auth/forgot-password', { email });
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status
        });
      }
      return thunkAPI.rejectWithValue({
        err: {
          error: 'Network Error'
        }
      });
    }
  }
);

export const ResetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (user: User, thunkAPI) => {
    try {
      const {
        password,
        token
      } = user;

      setAuthToken(token);
      const response = await axios.post('auth/reset-password', {
        password
      });
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status
        });
      }
      return thunkAPI.rejectWithValue({
        err: {
          error: 'Network Error'
        }
      });
    }
  }
);

export const SignIn = createAsyncThunk(
  'auth/signIn',
  async (user: User, thunkAPI) => {
    try {
      const {
        email,
        password
      } = user;
      const response = await axios.post('auth/sign-in', {
        email,
        password
      });
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status
        });
      }
      return thunkAPI.rejectWithValue({
        err: {
          error: 'Network Error'
        }
      });
    }
  }
);

interface AuthState {
  username: string;
  email: string;
  message: string;
  err: string;
  token: string;
  success: boolean;
  loading: boolean;
  role: string;
}

const initialState: AuthState = {
  username: '',
  email: '',
  message: '',
  err: '',
  token: '',
  success: false,
  loading: false,
  role: ''
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SetState(state: any, { payload: { field, value } }) {
      state[ field ] = value;
    },

    LogOut() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserRegistration.pending, (state) => {
        state.success = false;
        state.message = '';
        state.err = '';
      })
      .addCase(UserRegistration.fulfilled, (state, action) => {
        state.message = action.payload;
        state.success = true;
        state.err = '';
      })
      .addCase(UserRegistration.rejected, (state, action: any) => {
        state.message = '';
        state.err = action.payload.err?.error;
        state.success = false;
      })
      .addCase(SignIn.pending, (state) => {
        state.loading = true;
        state.err = '';
      })
      .addCase(SignIn.fulfilled, (state, action) => {
        state.username = action.payload.name,
          state.email = action.payload.userEmail,
          state.token = action.payload.token,
          state.loading = false,
          state.err = '';
      })
      .addCase(SignIn.rejected, (state, action: any) => {
        state.err = action.payload.err?.error;
        state.loading = false;
      })
      .addCase(ForgotPassword.pending, (state) => {
        state.success = false,
          state.loading = true,
          state.err = '',
          state.message = '';
      })
      .addCase(ForgotPassword.fulfilled, (state, action) => {
        state.message = action.payload.message,
          state.success = true,
          state.err = '',
          state.loading = false;
      })
      .addCase(ForgotPassword.rejected, (state, action: any) => {
        state.err = action.payload.err?.error,
          state.message = '',
          state.success = false,
          state.loading = false;
      })
      .addCase(ResetPassword.pending, (state) => {
        state.success = false,
          state.err = '',
          state.message = '';
      })
      .addCase(ResetPassword.fulfilled, (state, action) => {
        state.message = action.payload.message,
          state.err = '',
          state.success = true;
      })
      .addCase(ResetPassword.rejected, (state, action: any) => {
        state.err = action.payload.err?.error,
          state.message = '',
          state.success = false;
      });
  }
});

const { reducer, actions } = auth;

export const { SetState, LogOut } = actions;

export default reducer;
