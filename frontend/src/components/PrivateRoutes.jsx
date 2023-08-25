import React,{useContext} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthProvider";
import { getLocalAccessToken } from "../utils/constants";

const PrivateRoutes = ({ children }) => {
    const {authState} = useContext(AuthContext)
    const accessToken = getLocalAccessToken();
    const auth = !!(authState.isAuthenticated && accessToken)
    

    return <>{auth ? children :null  }</>
};

export default PrivateRoutes
