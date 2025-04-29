import { configureStore } from "@reduxjs/toolkit";
import authAdminReducer from "../slice/authAdmin";
import categoryReducer from "../slice/category";

export const store = configureStore({
  reducer: {
    authAdmin: authAdminReducer,
    category: categoryReducer,
    devTools: process.env.NODE_ENV !== "production",
  },
});
