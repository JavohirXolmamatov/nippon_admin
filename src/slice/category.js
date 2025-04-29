import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  category: [],
  error: null,
};
export const categorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    getCategoryStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.category = [];
    },
    getCategorySuccess: (state, actions) => {
      state.isLoading = false;
      state.category = actions.payload;
    },
    getCategoryFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
    deleteCategory: () => {},
  },
});

export const { getCategoryStart, getCategorySuccess, getCategoryFailure } =
  categorySlice.actions;

export default categorySlice.reducer;
