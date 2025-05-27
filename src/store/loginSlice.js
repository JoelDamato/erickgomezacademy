import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setUserData } from './userSlice';
import axios from 'axios';
import API_BASE_URL from '../api_base';

// Thunk para login
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: email.toLowerCase(),
        password,
      });
      // Guardar usuario en el slice de usuario
      dispatch(setUserData(response.data.user));
      return response.data; // { token, user }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Error al iniciar sesión.'
      );
    }
  }
);

// Thunk para registro
export const registerUser = createAsyncThunk(
  'login/registerUser',
  async ({ nombre, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/create/register`, {
        nombre,
        email: email.toLowerCase(),
        password,
        rol: 'user',
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Error al registrar usuario.'
      );
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
    user: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.successMessage = null;
    },
    clearLoginMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user = action.payload.user || null;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Registro
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Cuenta creada exitosamente. ¡Ahora puedes iniciar sesión!';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearLoginMessages } = loginSlice.actions;
export default loginSlice.reducer;