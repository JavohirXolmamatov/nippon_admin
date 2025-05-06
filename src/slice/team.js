import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  team: [],
  error: null,
};
export const teamSlice = createSlice({
  name: "Team",
  initialState,
  reducers: {
    getTeamStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.team = [];
    },
    getTeamSuccess: (state, actions) => {
      state.isLoading = false;
      state.team = actions.payload;
    },
    getTeamFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const { getTeamStart, getTeamSuccess, getTeamFailure } =
  teamSlice.actions;

export default teamSlice.reducer;
