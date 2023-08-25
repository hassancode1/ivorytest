import {
    AppstoreOutlined,
    WalletOutlined,
    UserOutlined,
    PoweroffOutlined
  } from "@ant-design/icons";
  import { Menu } from "antd";
  import { useEffect, useState ,useContext} from "react";
 import useCurrentUser from "../hooks/useCurrentUser";
  import { useLocation, useNavigate } from "react-router-dom";  
  import { AuthContext } from "../hooks/AuthProvider";
  import { getLocalAccessToken } from "../utils/constants";


  
  const getMenuItemsBasedOnRole = () => {
    const {user} = useCurrentUser()
    const {authState} = useContext(AuthContext)
    const accessToken = getLocalAccessToken();
    const auth = !!(authState.isAuthenticated && accessToken)

    if (user?.isAdmin) {
      return [
    
        {
          label: <> <h2 className="text-2xl  font-bold text-center">Ivory pay</h2></>,
        },
        {
          label: "Dashboard",
          icon: <AppstoreOutlined />,
          key: "/dashboard",
        },
        {
          label: "Users",
          key: "/users",
          icon: <UserOutlined />,
        },
        {
          label: "Sign Out",
          icon: <PoweroffOutlined />,
          key: "signout", // Unique key for Sign Out menu item
        },
       
      ];
    } else if (!user?.isAdmin) {
      return [
        
        {
          label: <> <h2 className="text-2xl  font-bold text-center">Ivory pay</h2></>,
        },
     
     
        {
          label: "My Wallet",
          key: "/mywallet",
          icon: <WalletOutlined />,
        },
        {
          label: "Sign Out",
          icon: <PoweroffOutlined />,
          key: "signout", // Unique key for Sign Out menu item
        },
      ];
    } 
  };

  
  function SideMenu() {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");
    const {logout} = useContext(AuthContext)
    useEffect(() => {
      const pathName = location.pathname;
      setSelectedKeys(pathName);
    }, [location.pathname]);
  
    const navigate = useNavigate();
    
    const menuItems = getMenuItemsBasedOnRole();
    const handleMenuItemClick = (item) => {
      if (item.key === "signout") {
       logout()
        navigate("/login");
      } else {
        navigate(item.key);
      }
    };
  
    
    return (
      
      <div className="SideMenu">
    
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          onClick={(item) => {
        handleMenuItemClick(item)
          
          }}
          selectedKeys={[selectedKeys]}
          items={menuItems}
        ></Menu>
        </div>
  
    );
  }
  export default SideMenu;