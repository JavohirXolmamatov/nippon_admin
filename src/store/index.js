import { configureStore } from "@reduxjs/toolkit";
import authAdminReducer from "../slice/authAdmin";
import categoryReducer from "../slice/category";
import discountReducer from "../slice/discount";
import sizeReducer from "../slice/size";

export const store = configureStore({
  reducer: {
    authAdmin: authAdminReducer,
    category: categoryReducer,
    discount: discountReducer,
    size: sizeReducer,
    devTools: process.env.NODE_ENV !== "production",
  },
});
