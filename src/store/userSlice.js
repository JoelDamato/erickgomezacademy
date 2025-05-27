import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  showProfile: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    clearUserData: (state) => {
      state.user = null;
    },
    setShowProfile: (state, action) => {
      state.showProfile = action.payload;
    },
  },
});

export const { setUserData, clearUserData, setShowProfile } = userSlice.actions;
export default userSlice.reducer;