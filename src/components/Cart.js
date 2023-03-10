import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {UserContext} from "./Context";
import Navbar from "./Navbar";

const Cart = () => {
  const context = useContext(UserContext);
  var navigate = useNavigate();

  // function checks if login user is empty or not if yes navigate to login page

  useEffect(() => {
    if (!(Object.keys(context.loginUser).length > 0)) {
      navigate("/");
    }
  }, []);

  // function used to decrement the products quantity in a cart
  const decHandler = (obj) => {
    let ind = (ele) => ele.id === obj.id;
    let index = context.products.findIndex(ind);
    let cartIndex = context.cart.findIndex(ind);
    if (context.cart[cartIndex].quantity > 0) {
      context.cart[cartIndex].quantity--;
      context.products[index].stock++;
    } else {
      context.cart.splice(cartIndex, 1);
    }
    context.setProducts([...context.products]);
    context.setCart([...context.cart]);
  };
  // function used to increment the products quantity
  const incHandler = (obj) => {
    let ind = (ele) => ele.id === obj.id;
    let index = context.products.findIndex(ind);
    let cartIndex = context.cart.findIndex(ind);
    if (context.products[index].stock > 0) {
      context.cart[cartIndex].quantity++;
      context.products[index].stock--;
    }
    context.setCart([...context.cart]);
    context.setProducts([...context.products]);
  };
  // function used to delete the product from cart
  const emptyhandler = (obj) => {
    let ind = (ele) => ele.id === obj.id;
    let index = context.products.findIndex(ind);
    let cartIndex = context.cart.findIndex(ind);
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
        {/* rendering of cart array when length of cart greater than 0 */}
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
            {context.cart.map((item, i) => {
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
          // rendering of image when cart length is 0
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
