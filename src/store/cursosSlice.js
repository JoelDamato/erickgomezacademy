import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_BASE_URL from '../api_base';

// Async thunk para obtener cursos
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, thunkAPI) => {
    const response = await fetch(`${API_BASE_URL}/api/courses/getcourses`);
    if (!response.ok) throw new Error('Error al obtener cursos');
    return await response.json();
  }
);

const cursosSlice = createSlice({
  name: 'courses',
  initialState: {
    cursosItems: [],
    cursosLoading: false,
    cursosError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.cursosLoading = true;
        state.cursosError = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.cursosLoading = false;
        state.cursosItems = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.cursosLoading = false;
        state.cursosError = action.error.message;
      });
  },
});

export default cursosSlice.reducer;