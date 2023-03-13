import { Badge } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./Context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
  const context = useContext(UserContext);
  // console.log('nadgsg')
  return (
    <nav className="navbar bg-body-tertiary position-fixed container-fluid">
      <div className="container-fluid">
        {/* rendering of admin icon which navigates to home page */}
        <Link to="/dashboard">
          <i className="fs-1 bi bi-person-fill"></i>
        </Link>
        <span className="fw-bold ">Hello, {context.loginUser.name}</span>
        {/* rendering of cart icon which navigates to cart page */}
        <Link to="/cart">
          <Badge badgeContent={context.cart.length} color="secondary">
            <ShoppingCartIcon color="action" />
          </Badge>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
