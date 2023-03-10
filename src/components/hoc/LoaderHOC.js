import React, { useEffect, useState } from "react";

const LoaderHOC = (Component) => {
  const MyLoaderFunc = () => {
    var [loader, setLoader] = useState(true);

    useEffect(() => {
      setLoader(false);
    }, []);
    return (
      <>
        {loader ? (
          <div>
            <img
              src="https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
              alt=""
            />
          </div>
        ) : (
          <Component />
        )}
      </>
    );
  };
  return MyLoaderFunc;
};

export default LoaderHOC;
