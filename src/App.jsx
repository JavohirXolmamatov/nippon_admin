import { Route, Routes } from "react-router-dom";
import { Isloading, Login, Main } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import StorageService from "./helpers/Storaje";
import AuthService from "./service/login";
import {
  userLoginFailure,
  userLoginStart,
  userLoginSuccess,
} from "./slice/authAdmin";
import {
  Category,
  Colors,
  Contact,
  Discount,
  Faq,
  News,
  Products,
  Sizes,
  Team,
} from "./pages";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "./slice/product";
import productService from "./service/product";
import {
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
} from "./slice/category";
import categoryService from "./service/category";
import {
  getDiscountFailure,
  getDiscountStart,
  getDiscountSuccess,
} from "./slice/discount";
import discountService from "./service/discount";
import { getSizeFailure, getSizeStart, getSizeSuccess } from "./slice/size";
import sizeService from "./service/size";
import { getColorFailure, getColorStart, getColorSuccess } from "./slice/color";
import colorService from "./service/color";

function App() {
  const dispatch = useDispatch();
  const { isLoading, loggedIn } = useSelector((state) => state.authAdmin);

  const getUser = async () => {
    const access_token = StorageService.getLocalStorage("Token") || null;
    if (!access_token) {
      dispatch(userLoginFailure("Token mavjud emas"));
      return;
    }

    dispatch(userLoginStart());
    try {
      const user = await AuthService.GetUser(access_token);
      dispatch(userLoginSuccess(user?.data));
    } catch (error) {
      dispatch(
        userLoginFailure(error?.message || "Foydalanuvchini olishda xatolik")
      );
    }
  };

  // get product
  const getProduct = async () => {
    dispatch(getProductStart());
    try {
      const res = await productService.getProduct();
      dispatch(getProductSuccess(res?.data?.products));
    } catch (error) {
      dispatch(getProductFailure(error?.message));
    }
  };

  // get category
  const getCategory = async () => {
    dispatch(getCategoryStart());
    try {
      const res = await categoryService.getCategory();
      dispatch(getCategorySuccess(res?.data));
    } catch (error) {
      dispatch(getCategoryFailure(error?.message));
    }
  };

  // get Discount
  const getDiscount = async () => {
    dispatch(getDiscountStart());
    try {
      const res = await discountService.getDiscount();
      dispatch(getDiscountSuccess(res?.data));
    } catch (error) {
      console.log(error);
      dispatch(getDiscountFailure(error?.message));
    }
  };

  // get sizes
  const getSizes = async () => {
    dispatch(getSizeStart());
    try {
      const res = await sizeService.getSize();
      dispatch(getSizeSuccess(res?.data));
    } catch (error) {
      console.log(error);
      dispatch(getSizeFailure(error?.message));
    }
  };

  // get color
  const getColor = async () => {
    dispatch(getColorStart());
    try {
      const res = await colorService.getColor();
      dispatch(getColorSuccess(res?.data));
    } catch (error) {
      dispatch(getColorFailure(error?.message));
    }
  };

  useEffect(() => {
    getUser();
    getProduct();
    getCategory();
    getDiscount();
    getSizes();
    getColor();
  }, []);

  return (
    <div className="">
      {isLoading ? (
        <Isloading />
      ) : loggedIn ? (
        <>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Products />} />
              <Route path="product" element={<Products />} />
              <Route path="category" element={<Category />} />
              <Route path="discount" element={<Discount />} />
              <Route path="sizes" element={<Sizes />} />
              <Route path="colors" element={<Colors />} />
              <Route path="faq" element={<Faq />} />
              <Route path="contact" element={<Contact />} />
              <Route path="team" element={<Team />} />
              <Route path="news" element={<News />} />
            </Route>
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
