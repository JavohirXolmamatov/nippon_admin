import { Route, Routes } from "react-router-dom";
import { Login, Main } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StorageService from "./helpers/Storaje";
import AuthService from "./service/login";
import {
  userLoginFailure,
  userLoginStart,
  userLoginSuccess,
} from "./slice/authAdmin";

function App() {
  const { isLoading, loggedIn } = useSelector((state) => state.authAdmin);
  const dispatch = useDispatch();

  const getUser = async () => {
    const access_token = StorageService.getLocalStorage("Token");
    dispatch(userLoginStart());
    try {
      const user = await AuthService.GetUser(access_token);
      dispatch(userLoginSuccess(user?.data));
    } catch (error) {
      dispatch(userLoginFailure(error));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="">
      {loggedIn ? (
        <>
          <Routes>
            <Route path="/" element={<Main />} />
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
