import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context";
import Navbar from "../Navbar";
import SearchHOC from "../hoc/SearchHOC";
import Products from "../Products";
import LoaderHOC from "../hoc/LoaderHOC";

const Dashboard = () => {
  const context = useContext(UserContext);
  let navigate = useNavigate();
  // value stored in a variable returned from loader Hoc
  let LoaderHocResult = LoaderHOC(Products);

  // array for dynamically filling of filter select box
  let filterArr = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ];

  useEffect(() => {
    if (!(Object.keys(context.loginUser).length > 0)) {
      navigate("/");
    }
  }, []);

  // function searches the products entered by the user
  const searchHandler = (e) => {
    context.searchProducts = [];
    context.products.map((item) => {
      if (
        item.title
          .toString()
          .toLocaleLowerCase()
          .slice(0, e.target.value.length) ===
        e.target.value.toString().toLocaleLowerCase()
      ) {
        context.searchProducts.push(item);
      }
    });
    context.setSearchProducts([...context.searchProducts]);
  };
  // value stored in a variable returned from searchHoc
  let SearchResult = SearchHOC(searchHandler);

  // function filters the data by category wise
  const selectHandler = (e) => {
    context.searchProducts = [];
    context.products.map((item) => {
      if (item.category === e.target.value) {
        context.searchProducts.push(item);
      }
    });
    context.setSearchProducts([...context.searchProducts]);
  };

  return (
    <>
      <Navbar />
      <div className="search d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-row align-items-center  col-4 justify-content-between border border-1 p-2 rounded">
          <input
            placeholder="Search Products..."
            className="col-11 border-0"
            onChange={(e) => searchHandler(e)}
          />
          <i className="bi bi-search"></i>
        </div>
        {/* rendering of search Hoc component */}
        <SearchResult />
        <div className="col-2">
          {/* dynamic rendering of filter select box */}
          <select
            className="col-12 rounded p-2"
            onChange={(e) => selectHandler(e)}
          >
            <option hidden>Filter Category</option>
            {filterArr.map((item, i) => {
              return <option key={i}>{item}</option>;
            })}
          </select>
        </div>
      </div>
      {/* rendering of Loader Hoc component */}
      <LoaderHocResult />
    </>
  );
};

export default Dashboard;
