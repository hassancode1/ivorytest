import React from 'react'
import {
    CopyOutlined ,  
  } from "@ant-design/icons";
  import { useState } from 'react';
  import useWalletDeposit from '../hooks/useWalletDeposit';
  import useCurrentUser from '../hooks/useCurrentUser';
import { Modal ,Input} from "antd";
import getWallet from '../hooks/getWallet';
const Deposit = ({depositModal, handleDepositcancel , handleDeposit , setEnterAmount, enterAmount}) => {
  // const [enterAmount ,setEnterAmount] = useState("")
  const [walletId, setWalletId] = useState("34900300443");
  // const {fetchWallet} = getWallet()
  const {user}=useCurrentUser()

  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(walletId).then(() => {
      setIsCopied(true);
    });
  };
  const  {createDeposit} = useWalletDeposit()
//   <Modal
//   title={ <h2 className='text-2xl  font-bold'>Deposit</h2>}
//   visible={depositModal}
//   onOk={handleDepositcancel}
//   onCancel={handleDepositcancel}
//   okButtonProps={{ style: { backgroundColor: '#1890ff', color: 'white' } }}
  
// >
//   <div className="flex flex-row  justify-between w-90 text-center items-start">
//   <div>
//   <p className="text-1xl text-left"> Ivory pay wallet id</p>
// <h3 className="font-bold text-2xl"> {walletId}</h3>
// </div>
// <div className="bg-slate-500 text-white  py-2 px-4 rounded-md cursor-pointer"  onClick={() =>handleCopy()}>{isCopied ? 'Copied!' : 'Copy to Clipboard'}  <CopyOutlined/></div>
// </div>
// </Modal>

// const handleDeposit = () =>{
//   if(enterAmount === "") return


//  const data ={
//   amount: enterAmount,
 
// }

//   createDeposit( data);
//   handleDepositcancel()
//   fetchWallet()
//   setEnterAmount("")
// }

  return (
    <Modal
    title={ <h2 className='text-2xl  font-bold'>Deposit to Ivory pay Account</h2>}
    visible={depositModal}
    onOk={handleDeposit}
    onCancel={handleDepositcancel}
    okText="Deposit" 
    okButtonProps={{ style: { backgroundColor: '#1890ff', color: 'white' } }}
    
  >
    <div className="flex flex-row  justify-between w-full text-center items-center">
    <div className='flex flex-col w-full items-start'>
    <p className="text-1xl  text-center"> Enter amount to deposit </p>
    <Input
      placeholder="Enter user waller Id "
      className=" w-full mt-3"
      type='number'
     value={enterAmount}
      onChange={(e) => setEnterAmount(e.target.value)}
    />
 </div>

 </div>
  </Modal>
  )
}

export default Deposit