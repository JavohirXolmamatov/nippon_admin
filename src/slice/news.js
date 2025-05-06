import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  news: [],
  error: null,
};
export const newsSlice = createSlice({
  name: "News",
  initialState,
  reducers: {
    getNewsStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.news = [];
    },
    getNewsSuccess: (state, actions) => {
      state.isLoading = false;
      state.news = actions.payload;
    },
    getNewsFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const { getNewsStart, getNewsSuccess, getNewsFailure } =
  newsSlice.actions;

export default newsSlice.reducer;
