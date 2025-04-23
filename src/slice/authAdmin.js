import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  loggedIn: false,
};
export const authAdminSlice = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {},
});

export const {} = authAdminSlice.actions;
export default authAdminSlice.reducer;
