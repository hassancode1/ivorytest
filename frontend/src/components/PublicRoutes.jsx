import React,{useContext} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthProvider";
import { getLocalAccessToken } from "../utils/constants";

const PublicRoutes = ({ children }) => {
    const {authState} = useContext(AuthContext)
  const accessToken = getLocalAccessToken();
  const auth = !!(authState.isAuthenticated && accessToken);
  return auth ? <Navigate to="/login" /> : children;
};

export default PublicRoutes;
