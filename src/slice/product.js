import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  product: [],
  error: null,
};
export const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    getProductStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.product = [];
    },
    getProductSuccess: (state, actions) => {
      state.isLoading = false;
      state.product = actions.payload;
    },
    getProductFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const { getProductStart, getProductSuccess, getProductFailure } =
  productSlice.actions;

export default productSlice.reducer;
