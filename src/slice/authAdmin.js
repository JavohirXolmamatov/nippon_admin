import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loggedIn: false,
  user: [],
  error: null,
};
export const authAdminSlice = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {
    userLoginStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.user = [];
    },
    userLoginSuccess: (state, actions) => {
      state.isLoading = false;
      state.loggedIn = true;
      state.user = actions.payload;
    },
    userLoginFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
    userLogout: (state) => {
      state.isLoading = false;
      state.loggedIn = false;
      state.user = [];
      state.error = null;
    },
  },
});

export const {
  userLoginStart,
  userLoginSuccess,
  userLoginFailure,
  userLogout,
} = authAdminSlice.actions;

export default authAdminSlice.reducer;
