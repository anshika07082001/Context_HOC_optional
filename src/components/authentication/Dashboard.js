import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context";

const Dashboard = () => {
  const context = useContext(UserContext);
  var navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(context.loginUser).length > 0) {
    } else {
      navigate("/");
    }
  }, []);

  const addproduct = (index) => {
    var obj = {};
    if (context.cart.length == 0) {
      obj = {
        id: context.products[index].id,
        title: context.products[index].title,
        img: context.products[index].thumbnail,
        quantity: 1,
        price: context.products[index].price,
      };
      context.cart.push(obj);
    } else {
      for (var i = 0; i < context.cart.length; i++) {
        if (context.cart.id == context.products[index].id) {
          context.cart.quantity++;
        } else {
          obj = {
            id: context.products[index].id,
            title: context.products[index].title,
            img: context.products[index].thumbnail,
            quantity: 1,
            price: context.products[index].price,
          };
          context.cart.push(obj);
        }
      }
    }
    context.setCart(context.cart);
  };
  // console.log(context.products);

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <i className="fs-1 bi bi-person-fill"></i>
          <span className="fw-bold ">Hello, {context.loginUser.name}</span>
        </div>
      </nav>
      {context.products !== undefined ? (
        <div className="grid">
          {context.products.map((item, index) => {
            return (
              <div className="grid__boxes shadow">
                <span>{item.title}</span>
                <img src={item.thumbnail} alt="" />
                <span>{item.brand}</span>
                <span className="grid__description">{item.description}</span>
                <button
                  className="btn btn-primary"
                  onClick={(e) => addproduct(index)}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <img
          src="https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif"
          alt=""
        />
      )}
    </>
  );
};

export default Dashboard;
