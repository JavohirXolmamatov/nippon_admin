import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  discount: [],
  error: null,
};
export const discountSlice = createSlice({
  name: "Discount",
  initialState,
  reducers: {
    getDiscountStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.discount = [];
    },
    getDiscountSuccess: (state, actions) => {
      state.isLoading = false;
      state.discount = actions.payload;
    },
    getDiscountFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
    deleteDiscount: () => {},
  },
});

export const { getDiscountStart, getDiscountSuccess, getDiscountFailure } =
  discountSlice.actions;

export default discountSlice.reducer;
