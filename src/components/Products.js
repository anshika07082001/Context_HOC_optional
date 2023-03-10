import React, { useContext } from "react";
import { UserContext } from "./Context";

const Products = () => {
  const context = useContext(UserContext);

  //   function used to add the products to the cart array
  const addproduct = (index) => {
    let obj = {};
    if (context.cart.length > 0) {
      for (var i = 0; i < context.cart.length; i++) {
        if (context.cart[i].id === context.searchProducts[index].id) {
          context.cart[i].quantity++;
          break;
        } else if (i === context.cart.length - 1) {
          obj = {
            id: context.searchProducts[index].id,
            title: context.searchProducts[index].title,
            img: context.searchProducts[index].thumbnail,
            quantity: 1,
            price: context.searchProducts[index].price,
          };
          context.cart.push(obj);
          break;
        }
      }
    } else {
      obj = {
        id: context.searchProducts[index].id,
        title: context.searchProducts[index].title,
        img: context.searchProducts[index].thumbnail,
        quantity: 1,
        price: context.searchProducts[index].price,
      };
      context.cart.push(obj);
    }
    context.setCart([...context.cart]);
  };

  return (
    <>
      {context.searchProducts !== undefined ? (
        context.searchProducts.length > 0 ? (
          <div className="grid">
            {/* rendering of products */}
            {context.searchProducts.map((item, index) => {
              return (
                <div className="grid__boxes shadow" key={index}>
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
          <p className="text-center">
            <img
              className="col-3"
              src="https://static.vecteezy.com/system/resources/previews/004/968/529/original/search-no-results-found-concept-illustration-flat-design-eps10-simple-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-with-editable-stroke-line-outline-linear-vector.jpg"
              alt=""
            />
          </p>
        )
      ) : (
        <div>
          <img
            className="col-3"
            src="https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif"
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Products;
