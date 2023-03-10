import React, { useEffect, useRef, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./authentication/Dashboard";
import Login from "./authentication/Login";
import Cart from "./Cart";
import UserContext from "./Context";

const Main = () => {
  const [users, setUsers] = useState([
    { name: "Anshika Chaurasiya", email: "user123@gmail.com", pwd: "User@123" },
  ]);
  const [loginUser, setLoginUser] = useState({});
  const [products, setProducts] = useState([]);
  const [searchProducts,setSearchProducts]=useState([])
  const [cart, setCart] = useState([]);
  var refInp = useRef({ email: "", pwd: "" });

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.products);
        setSearchProducts(result.products)
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
        path:'/cart',
        element:<Cart/>
    }
  ]);

  return (
    <UserContext.Provider
      value={{
        users: users,
        refInp: refInp,
        loginUser: loginUser,
        setLoginUser: setLoginUser,
        products: products,
        setProducts:setProducts,
        cart: cart,
        setCart: setCart,
        searchProducts:searchProducts,
        setSearchProducts:setSearchProducts
      }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default Main;
