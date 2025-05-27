import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cursosReducer from './cursosSlice';
import progresoReducer from './progresoSlice';
import loginReducer from './loginSlice';
import comentariosReducer from './comentariosSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
     cursos: cursosReducer,
    progreso: progresoReducer,
    login: loginReducer,
    comentarios: comentariosReducer,
  },
});

export default store;