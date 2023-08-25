import {
    DollarCircleOutlined,
    UserSwitchOutlined ,
    ShoppingOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Card, Space, Statistic, Table, Typography } from "antd";
  import { useEffect, useState } from "react";
  import useGetAllUsers from "../hooks/useGetAllUsers";
  import { useLocation } from "react-router-dom";
  
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  function Home() {
    const location = useLocation();

    const [initialLoad, setInitialLoad] = useState(true);

  
const {users} = useGetAllUsers()
const activeUsers = users?.filter((user) => user.isActive)
const inActive = users?.filter((user) => !user.isActive)

    return ( 
    <div className=" flex justify-center items-center ">
      <Space size={20} direction="vertical">
       
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Space direction="horizontal">
          <DashboardCard
        style={{width:'250px'}}
            icon={
              <UserSwitchOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 35,
                  padding: 8,
                 
                }}
              />
            }
            title={"All users"}
            value={users?.length}
          />
        
          <DashboardCard
            className="w-64 h-40"
            icon={
              <UserSwitchOutlined
                style={{
                  color: "white",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Active users"}
            value={activeUsers?.length}
          />
          <DashboardCard
            className="w-64 h-40"
            icon={
              <UserOutlined
                style={{
                  color: "red",
                  backgroundColor: "white",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"In active users"}
            value={inActive?.length}
          />
      
      
        </Space>
        <Space>
       
        </Space>
      </Space>
      </div>
    );
  }
  
  function DashboardCard({ title, value, icon }) {
    return (
      <Card style={{width:"250px"}}>
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    );
  }

  function DashboardChart() {
    const [reveneuData, setReveneuData] = useState({
      labels: [],
      datasets: [],
    });
  
   
  
   
  
    return (
        <div className="">
      <Card style={{ width: 500, height: 250 }}>
      
      </Card>
      </div>
    );
  }
  export default Home;