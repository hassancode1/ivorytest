import React,{useContext} from "react";
import "./App.css";
import PageContent from "./components/PageContent";
import SideMenu from "./components/SideMenu";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup";
import { AuthProvider,AuthContext } from "./hooks/AuthProvider";
import PublicRoutes from "./components/PublicRoutes";
import useCurrentUser from "./hooks/useCurrentUser";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  const {user} = useCurrentUser()
 
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
        
          <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
     
        
            <Route path="/accept/invite" element={<PublicRoutes><Signup /> </PublicRoutes>} />
         
        </Routes>
        
       (
       
          <div className="SideMenuAndPageContent">
          <PrivateRoutes> <SideMenu></SideMenu>  </PrivateRoutes>
            <PageContent></PageContent>
          </div>
         
        )
          <ToastContainer />
       
      </div>
    </AuthProvider>
  );
}

export default App;
