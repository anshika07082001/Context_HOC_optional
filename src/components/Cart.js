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

  const decHandler = (obj) => {
    var ind = (ele) => ele.id === obj.id;
    var index = context.products.findIndex(ind);
    var cartIndex = context.cart.findIndex(ind);
    if (context.cart[cartIndex].quantity > 0) {
      context.cart[cartIndex].quantity--;
      context.products[index].stock++;
    } else {
      context.cart.splice(cartIndex, 1);
    }
    context.setProducts([...context.products]);
    context.setCart([...context.cart]);
  };

  const incHandler = (obj) => {
    var ind = (ele) => ele.id === obj.id;
    var index = context.products.findIndex(ind);
    var cartIndex = context.cart.findIndex(ind);
    if (context.products[index].stock > 0) {
      context.cart[cartIndex].quantity++;
      context.products[index].stock--;
    }
    context.setCart([...context.cart]);
    context.setProducts([...context.products]);
  };

  const emptyhandler = (obj) => {
    var ind = (ele) => ele.id === obj.id;
    var index = context.products.findIndex(ind);
    var cartIndex = context.cart.findIndex(ind);
    context.products[index].stock =
      context.products[index].stock + context.cart[cartIndex].quantity;
    context.cart.splice(cartIndex, 1);
    context.setCart([...context.cart]);
    context.setProducts([...context.products]);
  };

  return (
    <>
      <Navbar />
      <div className="cart">
        {context.cart.length > 0 ? (
          <table>
            <tr>
              <th>Product Id</th>
              <th>Product Image</th>
              <th>Product Title</th>
              <th>Product Price</th>
              <th>Product Quantity</th>
              <th>Action</th>
            </tr>
            {context.cart.map((item,i) => {
              return (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>
                    <img src={item.img} alt="" />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="d-flex flex-row justify-content-around align-items-center">
                      <button
                        className="btn btn-outline-secondary rounded-circle"
                        onClick={() => decHandler(item)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary rounded-circle"
                        onClick={() => incHandler(item)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => emptyhandler(item)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        ) : (
          <p className="text-center">
            <img
              className="col-5"
              src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png"
              alt=""
            />
          </p>
        )}
      </div>
    </>
  );
};

export default Cart;