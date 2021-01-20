import React from "react";
import { Route, Redirect } from "react-router-dom";
import { checkLoginState } from "../Helpers/JWTHelper";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loginState = checkLoginState();
  return (
    <Route
      {...rest}
      render={
        (props) => loginState ? <Component {...props} /> : <Redirect to="/Login" />
      }
    />
  );
};

export default PrivateRoute;
