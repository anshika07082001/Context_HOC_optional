import React, { useRef, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./authentication/Dashboard";
import Login from "./authentication/Login";
import UserContext from "./Context";

const Main = () => {
  const [users, setUsers] = useState([
    { name: "Anshika Chaurasiya", email: "user123@gmail.com", pwd: "User@123" },
  ]);
  const [loginUser, setLoginUser] = useState({});
  var refInp = useRef({ email: "", pwd: "" });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    <UserContext.Provider
      value={{
        users: users,
        refInp: refInp,
        loginUser: loginUser,
        setLoginUser: setLoginUser,
      }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default Main;
