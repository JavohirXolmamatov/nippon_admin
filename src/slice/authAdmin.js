import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  loggedIn: false,
  user: [],
  error: null,
};
export const authAdminSlice = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {
    userLoginStart: (state) => {
      state.isloading = true;
      state.error = null;
      state.user = [];
    },
    userLoginSuccess: (state, actions) => {
      state.isloading = false;
      state.loggedIn = true;
      state.user = actions.payload;
    },
    userLoginFailure: (state, actions) => {
      state.isloading = false;
      state.error = actions.payload;
    },
    userLogout: (state) => {
      state.isloading = false;
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
