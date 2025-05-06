import { configureStore } from "@reduxjs/toolkit";
import authAdminReducer from "../slice/authAdmin";
import categoryReducer from "../slice/category";
import discountReducer from "../slice/discount";
import sizeReducer from "../slice/size";
import colorReducer from "../slice/color";
import contactReducer from "../slice/contact";
import faqReducer from "../slice/faq";
import teamReducer from "../slice/team";
import newsReducer from "../slice/news";

export const store = configureStore({
  reducer: {
    authAdmin: authAdminReducer,
    category: categoryReducer,
    discount: discountReducer,
    size: sizeReducer,
    color: colorReducer,
    contact: contactReducer,
    faq: faqReducer,
    team: teamReducer,
    news: newsReducer,
    devTools: process.env.NODE_ENV !== "production",
  },
});
