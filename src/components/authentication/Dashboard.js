import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Context";
import Navbar from "../Navbar";

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

    if (context.cart.length > 0) {
      for (var i = 0; i < context.cart.length; i++) {
        if (context.cart[i].id === context.products[index].id) {
          context.cart[i].quantity++;
          break;
        } else if (i === context.cart.length - 1) {
          obj = {
            id: context.products[index].id,
            title: context.products[index].title,
            img: context.products[index].thumbnail,
            quantity: 1,
            price: context.products[index].price,
          };
          context.cart.push(obj);
          break;
        }
      }
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
    context.setCart([...context.cart]);
  };
  console.log(context.cart);

  return (
    <>
      <Navbar />
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
