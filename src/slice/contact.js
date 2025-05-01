import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  contact: [],
  error: null,
};
export const contactSlice = createSlice({
  name: "Contact",
  initialState,
  reducers: {
    getContactStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.contact = [];
    },
    getContactSuccess: (state, actions) => {
      state.isLoading = false;
      state.contact = actions.payload;
    },
    getContactFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const { getContactStart, getContactSuccess, getContactFailure } =
  contactSlice.actions;

export default contactSlice.reducer;
