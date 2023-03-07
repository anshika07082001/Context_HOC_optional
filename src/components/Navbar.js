import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./Context";

const Navbar = () => {
  const context = useContext(UserContext);
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <i className="fs-1 bi bi-person-fill"></i>
        <span className="fw-bold ">Hello, {context.loginUser.name}</span>
        <Link to="/cart">
          <i className="bi bi-cart2 fs-1 "></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
