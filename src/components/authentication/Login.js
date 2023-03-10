import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context";

const Login = () => {
  const context = useContext(UserContext);
  var navigate = useNavigate();

  // function checks the entered details if matches then user login successfully
  const loginHandler = (e) => {
    e.preventDefault();
    context.users.map((item) => {
      if (
        item.email == context.refInp.current.email.value &&
        item.pwd == context.refInp.current.pwd.value
      ) {
        context.setLoginUser(item);
        navigate("/dashboard");
      } else {
        console.log("User not found");
      }
    });
    e.target.reset();
  };
  
  return (
    <div className="col-6 m-auto mt-4 border p-4 rounded">
      <form onSubmit={(e) => loginHandler(e)}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={(ref) => (context.refInp.current.email = ref)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            ref={(ref) => (context.refInp.current.pwd = ref)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;