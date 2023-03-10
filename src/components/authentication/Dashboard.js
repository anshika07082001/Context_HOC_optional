import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context";
import Navbar from "../Navbar";

const Dashboard = () => {
  const context = useContext(UserContext);
  var navigate = useNavigate();

// array for dynamically filling of filter select box
  var filterArr =['smartphones','laptops','fragrances','skincare','groceries','home-decoration']

  useEffect(() => {
    if (Object.keys(context.loginUser).length > 0) {
    } else {
      navigate("/");
    }
  }, []);

  // function adds the products to the cart array
  const addproduct = (index) => {
    var obj = {};
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

  // function searches the products entered by the user 
  const searchHandler =(e)=>{
    context.searchProducts=[]
    context.products.map((item)=>{
      if(item.title.toString().toLocaleLowerCase().slice(0,e.target.value.length)===e.target.value.toString().toLocaleLowerCase()){
        context.searchProducts.push(item)
      }
    })
    context.setSearchProducts([...context.searchProducts])
  }

  // function filters the data by category wise
  const selectHandler=(e)=>{
    context.searchProducts=[]
    context.products.map((item)=>{
      console.log(item)
      if(item.category===e.target.value){
        context.searchProducts.push(item)
      }
    })
    context.setSearchProducts([...context.searchProducts])
  }


  return (
    <>
      <Navbar />
      <div className="search d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-row align-items-center  col-5 justify-content-between border border-1 p-2 rounded">
          <input placeholder="Search Products..." className="col-11 border-0" onChange={(e)=>searchHandler(e)}/>
          <i className="bi bi-search"></i>
        </div>
        <div className="col-2">
          {/* dynamic rendering of filter select box */}
          <select className="col-12 rounded p-2" onChange={(e)=>selectHandler(e)}>
            <option hidden>Filter Category</option>
            {filterArr.map((item,i)=>{
              return (
                <option key={i}>{item}</option>
              )
            })}
          </select>
        </div>
      </div>
      {context.searchProducts !== undefined ? (
        context.searchProducts.length>0?
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
        </div>:<p className="text-center"><img className="col-3" src="https://static.vecteezy.com/system/resources/previews/004/968/529/original/search-no-results-found-concept-illustration-flat-design-eps10-simple-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-with-editable-stroke-line-outline-linear-vector.jpg" alt=""/></p>
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