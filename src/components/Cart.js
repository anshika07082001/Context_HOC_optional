import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./Context";
import Navbar from "./Navbar";

const Cart = () => {
  const context = useContext(UserContext);
  var navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(context.loginUser).length > 0) {
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Navbar />
    </>
  );
};

export default Cart;
