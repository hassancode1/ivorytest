import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import UserManagement from "../pages/UserManagement";
import UserWallet from "../pages/UserWallet";
import ApplicantRoutes from "./ApplicantRoutes";
import IsAdminRoutes from "./IsAdminRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<IsAdminRoutes><Home /></IsAdminRoutes>}></Route>
      <Route path="/users" element={ <IsAdminRoutes><UserManagement/></IsAdminRoutes>}></Route>
      
      <Route path="/mywallet" element={<ApplicantRoutes><UserWallet/> </ApplicantRoutes>}></Route>
     
    </Routes>
  );
}
export default AppRoutes;
