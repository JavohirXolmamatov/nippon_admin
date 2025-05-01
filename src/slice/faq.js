import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  faq: [],
  error: null,
};
export const faqSlice = createSlice({
  name: "Faq",
  initialState,
  reducers: {
    getFaqStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.faq = [];
    },
    getFaqSuccess: (state, actions) => {
      state.isLoading = false;
      state.faq = actions.payload;
    },
    getFaqFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const { getFaqStart, getFaqSuccess, getFaqFailure } = faqSlice.actions;

export default faqSlice.reducer;
