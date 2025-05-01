import { configureStore } from "@reduxjs/toolkit";
import authAdminReducer from "../slice/authAdmin";
import categoryReducer from "../slice/category";
import discountReducer from "../slice/discount";
import sizeReducer from "../slice/size";
import colorReducer from "../slice/color";

export const store = configureStore({
  reducer: {
    authAdmin: authAdminReducer,
    category: categoryReducer,
    discount: discountReducer,
    size: sizeReducer,
    color: colorReducer,
    devTools: process.env.NODE_ENV !== "production",
  },
});
