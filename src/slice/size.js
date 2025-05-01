import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  size: [],
  error: null,
};
export const sizeSlice = createSlice({
  name: "Size",
  initialState,
  reducers: {
    getSizeStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.size = [];
    },
    getSizeSuccess: (state, actions) => {
      state.isLoading = false;
      state.size = actions.payload;
    },
    getSizeFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const { getSizeStart, getSizeSuccess, getSizeFailure } =
  sizeSlice.actions;

export default sizeSlice.reducer;
