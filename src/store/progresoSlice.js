import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_BASE_URL from '../api_base';

// Thunk para obtener el progreso del usuario en un curso
export const fetchProgreso = createAsyncThunk(
  'progreso/fetchProgreso',
  async ({ email, cursoId }, thunkAPI) => {
    const response = await fetch(`${API_BASE_URL}/api/progresoget?email=${email}`);
    if (!response.ok) throw new Error('Error al obtener progreso');
    const data = await response.json();
    // Filtrar solo el progreso del curso actual
    const sanitizeTitle = (title) =>
      title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\.\-]/g, '');
    const progresoMap = {};
    data
      .filter(
        (p) =>
          p.email === email &&
          sanitizeTitle(p.cursoId) === cursoId
      )
      .forEach((p) => {
        progresoMap[p.capituloId] = p.estado;
      });
    return progresoMap;
  }
);

// Thunk para actualizar el progreso de un capítulo
export const updateProgreso = createAsyncThunk(
  'progreso/updateProgreso',
  async ({ email, cursoId, capituloId, accion }, thunkAPI) => {
    const response = await fetch(`${API_BASE_URL}/api/progreso`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, cursoId, capituloId, accion }),
    });
    if (!response.ok) throw new Error('Error al actualizar progreso');
    // Se asume que el backend responde con el nuevo estado del capítulo
    const data = await response.json();
    // Ejemplo de respuesta esperada: { capituloId: "Modulo-1", estado: "en_progreso" }
    return { capituloId, estado: data.estado || 'en_progreso' };
  }
);

const progresoSlice = createSlice({
  name: 'progreso',
  initialState: {
    progreso: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgreso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgreso.fulfilled, (state, action) => {
        state.loading = false;
        state.progreso = action.payload;
      })
      .addCase(fetchProgreso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProgreso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProgreso.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizar solo el capítulo modificado
        const { capituloId, estado } = action.payload;
        state.progreso[capituloId] = estado;
      })
      .addCase(updateProgreso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default progresoSlice.reducer;