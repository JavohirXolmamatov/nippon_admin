import { configureStore } from "@reduxjs/toolkit";
import authAdminReducer from "../slice/authAdmin";

export const store = configureStore({
  reducer: {
    authAdmin: authAdminReducer,
    devTools: process.env.NODE_ENV !== "production",
  },
});
