import React from "react";
import { Redirect, Route } from "react-router-dom";

const AuthorizedRoute = ({
  isUserAuthenticated,
  component: Component,
  ...rest
}) => {
  const renderRoute = (props) => {
    if (isUserAuthenticated) {
      return <Component {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return <Route {...rest} render={renderRoute} />;
};

export default AuthorizedRoute;
