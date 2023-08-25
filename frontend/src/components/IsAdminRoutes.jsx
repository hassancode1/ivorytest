import React,{useContext, useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthProvider";
import useCurrentUser from "../hooks/useCurrentUser";
import { getLocalAccessToken } from "../utils/constants";
const IsAdminRoutes = ({ children }) => {
 
    const accessToken = getLocalAccessToken();
 const {user} = useCurrentUser()
    const {authState} = useContext(AuthContext)
  const auth = !!(authState.isAuthenticated && accessToken);
  return <>{auth && user?.isAdmin ? children : <Navigate to="/dashboard" />}</>;
};

export default IsAdminRoutes;
