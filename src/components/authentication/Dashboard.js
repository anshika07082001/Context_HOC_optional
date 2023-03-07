import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context";

const Dashboard = () => {
  const context = useContext(UserContext);
  console.log(context);
  var navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(context.loginUser).length > 0) {
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <i className="fs-1 bi bi-person-fill"></i>
          <span className="fw-bold ">Hello, {context.loginUser.name}</span>
        </div>
      </nav>
      <img
        className="col-12"
        style={{ height: "90vh" }}
        src="https://www.pushengage.com/wp-content/uploads/2022/02/Best-Website-Welcome-Message-Examples.png"
        alt=""
      />
    </>
  );
};

export default Dashboard;
