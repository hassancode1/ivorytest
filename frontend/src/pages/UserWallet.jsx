import React from "react";
import {

  PlusOutlined ,
  CopyOutlined ,
  ArrowsAltOutlined,
  TransactionOutlined 
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Select,Modal} from "antd";
import { dollarFormatter } from "../utils/constants";
import Deposit from "../components/Deposit";
import { useEffect, useState } from "react";
import getWallet from "../hooks/getWallet";
import Transfer from "../components/Transfer";
import Withdraw from "../components/Withdraw";
import useWalletWithdraw from "../hooks/useWalletWithdraw";
import useTransfer from "../hooks/useTransfer";
import useWalletDeposit from "../hooks/useWalletDeposit";

const UserWallet = () => {


 
  const [enterAmount ,setEnterAmount] = useState("")
const [enterTransfer, setEnterTransfer] = useState("")
const [enterRecipient, setEnterRecipient] = useState("")
const [enterWithdraw, setEnterWithdraw] = useState("")
 
  const handleDepositcancel = () => {
    setDepositModal(false);
  };
  const  {createDeposit} = useWalletDeposit()
  const {createTransfer} = useTransfer()
  const {createWithdraw} = useWalletWithdraw()

  const [depositModal, setDepositModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false)
  const [transferModal, setTransferModal] = useState(false)
  console.log(withdrawModal)
  const {wallet , fetchWallet} = getWallet()
  useEffect(() => {
    fetchWallet();
  }, [enterAmount, enterTransfer, enterWithdraw]);
  const handleTransfercancel = () => {
    setTransferModal(false);
  };
  const handleWithdrawcancel = () => {
    setWithdrawModal(false);
  };
  const handleWithdraw = () =>{
    if(enterWithdraw === "") return
   const data ={
    amount: parseFloat(enterWithdraw),
   
  }
    createWithdraw(data);
    handleWithdrawcancel()
    fetchWallet()
    setEnterWithdraw("")
  }
  const handleTransfer =()=>{
    if(enterTransfer === "") return
    const data ={
     amount: parseFloat(enterTransfer),  
     recipient:parseFloat(enterRecipient)
   }
     createTransfer(data);
     handleTransfercancel()
     fetchWallet()
     setEnterRecipient("")
     setEnterTransfer("")
  }
  const handleDeposit = () =>{
    if(enterAmount === "") return
   const data ={
    amount: parseFloat(enterAmount),
   
  }
    createDeposit(data);
    handleDepositcancel()
    fetchWallet()
    setEnterAmount("")
  }
  

  

  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount', 
      key: 'amount',
    },
    {
      title: 'wallet address',
      dataIndex: 'wallet', 
      key: 'wallet',
    },
    {
      title: 'date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Select defaultValue="download" style={{ width: 120 }}>
          <Option value="option1">Download pdf</Option>
       
       
        </Select>
      ),
    },
  ];
  
 const data= [{
    key: '1',
    amount: '$1000',
    wallet: '22452452452454',
  date:"2021/08",
    status: 'success',
  }]

  return (
    <div className="flex justify-center items-center w-9/12">
    <div className="w-full"> 
      <h2 className="mb-4 text-2xl font-bold">User Wallet</h2>
      <div className="bg-white px-8 py-8 w-full">
        <h2>main balance</h2>
        <h3 className="text-2xl font-bold mt-4">{dollarFormatter(wallet?.wallet.amount)}</h3>
        <div className="flex flex-row justify-between w-35rem mt-4 ">
          <div>
            <div className=
            "bg-primaryBtn text-white text-1xl py-3 px-3 font-bold rounded flex justify-center items-center gap-2 cursor-pointer"
            onClick={() => setDepositModal( true)}
            >
              <PlusOutlined
                style={{
                  color: "white",
               
                  borderRadius: 20,
                  fontSize: 15,
                
                }}
               
               /> Deposit
            </div>
          </div>
          <div className=
          "bg-primaryBtn text-white py-3 px-3 font-bold rounded flex justify-between items-center gap-2 cursor-pointer"
          onClick={() => setTransferModal( true)}
          >
            <TransactionOutlined 
              style={{
                color: "white",
          
                borderRadius: 20,
                fontSize: 15,
              
              }}
            /> Transfer
          </div>
          <div className="bg-primaryBtn text-white py-3 px-2 font-bold rounded flex justify-center items-center gap-2 cursor-pointer"
            onClick={() => setWithdrawModal(true)}
          >
            <ArrowsAltOutlined 
              style={{
                color: "white",
             
                borderRadius: 20,
                fontSize: 15,
           
              }}
            
            /> Withdraw
          </div>
        </div>
      
      </div>
     
    </div>
      
 <Deposit  
 depositModal={depositModal}
handleDeposit={handleDeposit}
enterAmount={enterAmount}
setEnterAmount={setEnterAmount}
   handleDepositcancel={handleDepositcancel}
 />
  <Transfer  
 transferModal={transferModal}
 handleTransfer={handleTransfer}
 enterTransfer={enterTransfer}
 setEnterTransfer={setEnterTransfer}
 enterRecipient={enterRecipient}
 setEnterRecipient={setEnterRecipient}
 wallet={wallet}
   handleTransfercancel={handleTransfercancel}
 />

 <Withdraw 
 withdrawModal={withdrawModal}
 handleWithdraw={handleWithdraw}
 enterWithdraw={enterWithdraw}
 setEnterWithdraw={setEnterWithdraw}
wallet={wallet}
 handleWithdrawcancel={handleWithdrawcancel}
 />
  </div>

  
  );
};

export default UserWallet;
