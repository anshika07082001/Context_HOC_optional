import React from "react";

const SearchHOC = (searchHandler) => {
  const MyFunction = () => {
    const searchFunc = (e) => {
      setTimeout(() => {
        searchHandler(e);
      }, 1000);
    };

    return (
      <div className="d-flex flex-row align-items-center  col-4 justify-content-between border border-1 p-2 rounded">
        <input
          placeholder="Search Products using Debounce Functionality"
          type="text"
          className="col-11 border-0"
          onChange={(e) => searchFunc(e)}
        />
        <i className="bi bi-search"></i>
      </div>
    );
  };
  return MyFunction;
};

export default SearchHOC;
