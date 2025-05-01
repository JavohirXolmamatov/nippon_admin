import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  color: [],
  error: null,
};
export const colorSlice = createSlice({
  name: "Color",
  initialState,
  reducers: {
    getColorStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.color = [];
    },
    getColorSuccess: (state, actions) => {
      state.isLoading = false;
      state.color = actions.payload;
    },
    getColorFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const { getColorStart, getColorSuccess, getColorFailure } =
  colorSlice.actions;

export default colorSlice.reducer;
