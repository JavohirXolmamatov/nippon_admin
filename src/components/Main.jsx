import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { navLogo } from "../assets/index";
import StorageService from "../helpers/Storaje";
import { useDispatch } from "react-redux";
import { userLogout } from "../slice/authAdmin";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nav = [
    "product",
    "category",
    "discount",
    "sizes",
    "colors",
    "faq",
    "contact",
    "team",
    "news",
  ];

  const logOut = () => {
    StorageService.removeItemToken("Token");
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <div className="flex bg-black/10 relative">
      <nav className="w-[15%] bg-[#1E2939] h-screen flex flex-col justify-start items-center gap-6 text-white font-medium py-10">
        <img
          src={navLogo}
          alt={navLogo}
          className="size-22"
          onClick={() => navigate("/")}
        />
        {nav.map((item, index) => (
          <NavLink
            to={`/${item}`}
            key={index}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-bold uppercase"
                : "text-white capitalize font-medium"
            }
          >
            {item}
          </NavLink>
        ))}
      </nav>
      <main className="w-[85%] h-screen px-4 py-6">
        <div className="text-end my-8 ">
          <Button
            type="primary"
            danger
            size="large"
            icon={<DeleteOutlined />}
            onClick={logOut}
          >
            Log Out
          </Button>
        </div>
        <section className="bg-white rounded-md p-5">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Main;
