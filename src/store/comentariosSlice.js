import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_BASE_URL from '../api_base';

// Thunk para obtener comentarios
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async ({ cursoId, moduleName, chapterId }, thunkAPI) => {
    const response = await fetch(
      `${API_BASE_URL}/api/comments/${cursoId}/${moduleName}/${chapterId}`
    );
    if (!response.ok) throw new Error('Error al obtener comentarios');
    return await response.json();
  }
);

// Thunk para agregar comentario
export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ cursoId, moduleName, chapterId, userEmail, userName, content }, thunkAPI) => {
    const response = await fetch(`${API_BASE_URL}/api/comments/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId: cursoId,
        moduleName,
        chapterId: parseInt(chapterId, 10),
        userEmail,
        userName,
        content,
      }),
    });
    if (!response.ok) throw new Error('Error al agregar comentario');
    return await response.json();
  }
);

// Thunk para eliminar comentario
export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, thunkAPI) => {
    const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al borrar comentario');
    return commentId;
  }
);

const comentariosSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearComments(state) {
      state.items = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchComments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // addComment
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        // El backend retorna el comentario agregado, lo agregamos al array
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // deleteComment
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        // Eliminamos el comentario por id
        state.items = state.items.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearComments } = comentariosSlice.actions;
export default comentariosSlice.reducer;