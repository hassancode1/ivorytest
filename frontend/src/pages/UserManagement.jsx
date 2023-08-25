import { useEffect, useState } from "react";
  import {  Space, Table, Typography ,Input, Select,Modal,Form} from "antd";
import { SearchOutlined,SendOutlined } from '@ant-design/icons';
import useInvite from "../hooks/useInvite";
import toggleUser from "../hooks/toggleUser";
import useGetAllUsers from "../hooks/useGetAllUsers";

  import { toast } from "react-toastify";


  
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
  
  function UserManagement() {
    const {toggleuser} = toggleUser()
    const {createInvite}= useInvite()
    const {users, fetchUsers} = useGetAllUsers()
    const [useremail, setUseremail]= useState("")
    const [invite, setInvite] = useState(false);
    useEffect(() =>{
    fetchUsers()
    },[toggleuser])
   const activeUsers = users?.filter((user) => user.firstName !== undefined && user.firstName !== '');
 
  const pendingInvite = users?.filter((user) => !user.isActive && user.firstName === '' )

const handleOk = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(useremail)) {
    toast.error("please use a valid email")
    return;
  }

  createInvite(useremail);
  handleCancel();
};

const handleCancel = () => {
  setInvite(false);
  setUseremail("")

};

const handleToggle =(user) =>{

const data={
  userId:user.id,
  isActive:!user.isActive
}
toggleuser(data)
fetchUsers()
}
 
    const columns = [
    
      {
        title: 'First name',
        dataIndex: 'firstName', 
        key: 'firstName',
      },
      {
        title: 'Last name',
        dataIndex: 'lastName', 
        key: 'lastName',
      },
      {
        title: 'email',
        dataIndex: 'email', 
        key: 'emai;',
      },
      {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <span style={{ color: isActive ? 'green' : 'red' }}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    
      {
        title: 'Action',
        key: 'action',
        render: (user) => (
          <button
        type="button"
        className={`px-4 py-2 ${
          user.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        } text-white rounded`}
        onClick={() =>handleToggle(user)}
      >
        {user.isActive ? "Disable" : "Enable"}
      </button>
        ),
      },
    ];
    const columnPending = [
     
      {
        title: 'email',
        dataIndex: 'email', 
        key: 'email',
      },
     {
    title: 'Status',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (isActive) => (
      <span style={{ color: isActive ? 'green' : 'red' }}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    ),
  },
      
    ];
    
  
    
    
  
    return ( 
    <div className=" flex  ">
      <Space size={20} direction="vertical">
       
        <Typography.Title level={4}>User management</Typography.Title>
        <Space direction="horizontal">
      {/* <input type="text" placeholder="Search users name or email" className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-400 w-full"/> */}
     <Input
      placeholder="Search users name or email"
      className=" w-full"
      addonBefore={<SearchOutlined />}
    //   onChange={(e) => handleSearchInputChange(e.target.value)}
    />



<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
onClick={() => setInvite(true)}
>
     Invite
      </button>
    
      <Modal
        title={ <h2 className='text-2xl  font-bold '>Invite a user</h2>}
        visible={invite}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Send" 
        okButtonProps={{ style: { backgroundColor: '#1890ff', color: 'white' } }}
        
      >
        
        <p className=" py-4">This will send an invite link to the user</p>
     
      <Input
        placeholder="Add a user email to invite "
        className="w-full"
        addonAfter={<SendOutlined />}
        onChange={(e) => setUseremail(e.target.value)}
      />
  
        
      
      </Modal>

      </Space>
    
      <h2 className="text-2xl  font-bold"> All Active Users</h2>
   
     <Table columns={columns} dataSource={activeUsers === null ? [] : activeUsers} style={{width:"950px"}}/>

      <h2 className="text-2xl text-red-600 font-bold"> Pending Invite</h2>
      <Table columns={columnPending} dataSource={pendingInvite} style={{width:"950px"}}/>;
     
      </Space>
      </div>
    );
  }
  

  export default UserManagement;