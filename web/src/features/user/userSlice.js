import { createSlice } from '@reduxjs/toolkit';

const userToken =
  localStorage.getItem('userToken') !== null
    ? JSON.parse(localStorage.getItem('userToken'))
    : '';

const userEmail =
  localStorage.getItem('userEmail') !== null
    ? JSON.parse(localStorage.getItem('userEmail'))
    : '';

const initialState = {
  userToken,
  userEmail,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateToken(state, action) {
      state.userToken = action.payload.token;
      state.userEmail = action.payload.email;
      localStorage.setItem('userToken', JSON.stringify(state.userToken));
      localStorage.setItem('userEmail', JSON.stringify(state.userEmail));
    },
    signOutUser(state, action) {
      state.userToken = '';
      state.userEmail = '';
      localStorage.setItem('userToken', JSON.stringify(state.userToken));
      localStorage.setItem('userEmail', JSON.stringify(state.userEmail));
    },
  },
});

export const { updateToken, signOutUser } = userSlice.actions;

export default userSlice.reducer;

export const getToken = (state) => state.user.userToken;

export const getEmail = (state) => state.user.userEmail;
