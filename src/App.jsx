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
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="">
      {isLoading ? (
        <Isloading />
      ) : loggedIn ? (
        <>
          <Routes>
            <Route path="/" element={<Main />}>
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
