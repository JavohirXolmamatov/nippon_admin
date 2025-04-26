import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  userLoginFailure,
  userLoginStart,
  userLoginSuccess,
} from "../slice/authAdmin";
import AuthService from "../service/login";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import StorageService from "../helpers/Storaje";

function Login() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authAdmin);

  const onFinish = async (values) => {
    dispatch(userLoginStart());
    try {
      const res = await AuthService.UserLogin(values);
      dispatch(userLoginSuccess(res?.data));
      StorageService.SetLocalStorage("Token", res?.data?.access_token);

      Toastify({
        text: res?.data?.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (err) {
      dispatch(
        userLoginFailure(
          err?.response?.data?.message?.message || "Server xatoligi"
        )
      );
      Toastify({
        text: err?.response?.data?.message?.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  };

  const onFinishFailed = (values) => {
    console.log("Failed:", values?.errorFields[0]?.errors[0]);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center align-middle bg-[#F3F4F6]">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="bg-white w-[360px] h-[360px] flex flex-col justify-center items-center rounded-xl"
        onSubmitCapture={onsubmit}
      >
        <h1 className="text-3xl">Login</h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
          className="w-7/10"
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            name="username"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
          className="w-7/10"
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        <Form.Item className="w-7/10">
          <Button block type="primary" htmlType="submit" size="large">
            {isLoading ? "loading..." : "Log in"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
