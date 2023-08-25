import React,{useContext, useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import { AuthContext } from "../hooks/AuthProvider";
import { getLocalAccessToken } from "../utils/constants";
const ApplicantRoutes = ({ children }) => {
    const accessToken = getLocalAccessToken();
   const {user} = useCurrentUser()
  
    const {authState} = useContext(AuthContext)
  const auth = !!(authState.isAuthenticated && accessToken);
  return <>{auth && !user?.isAdmin ? children : <Navigate to="/dashboard" />}</>;
};

export default ApplicantRoutes;
