import React from "react";
import { Route, Redirect } from "react-router-dom";
import { checkLoginState } from "./JWTHelper";

const PublicRoute = ({ component: Component, ...rest }) => {
  const loginState = checkLoginState();
  return (
    <Route
      {...rest}
      render={(props) =>
        loginState ? <Redirect to="/ProductCatalogItem" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
