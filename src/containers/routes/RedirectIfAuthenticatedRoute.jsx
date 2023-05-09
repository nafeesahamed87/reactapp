import React from "react";
import {  Navigate } from "react-router-dom";
import { RouteKeys } from "./route-keys";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api";

const RedirectIfAuthenticatedRoute = (props) => {
  const auth = useAuth(api.auth);
  /*const { component, redirectTo, ...rest } = props; */
  if (!auth.isAuthenticated) {
    return <div className='flex'>{props.children}</div>
  } else {
    return (
      <>
        <Navigate
          to={window.localStorage.getItem('redirect') ?? RouteKeys.Home}
          state={{ path: window.location.pathname }}
        />
      </>
    )
  };  
};

export default RedirectIfAuthenticatedRoute;
