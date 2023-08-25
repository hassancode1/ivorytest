import React,{useMemo} from 'react'

import { Modal ,Input} from "antd";

const Withdraw = ({withdrawModal, wallet,handleWithdrawcancel , handleWithdraw , setEnterWithdraw, enterWithdraw}) => {
   
    const cantTransfer = useMemo(() => {
        if (!wallet || !wallet.wallet) {
          return false; 
        }
        return parseFloat(wallet?.wallet.amount) < parseFloat(enterWithdraw);
      }, [wallet, enterWithdraw]);
      console.log(cantTransfer)
  return (
    <Modal
    title={ <h2 className='text-2xl  font-bold'>Withdrawal</h2>}
    open={withdrawModal}
    onOk={handleWithdraw}
    onCancel={handleWithdrawcancel}
    okText="Deposit" 
    okButtonProps={{
        style: {
          backgroundColor: '#1890ff',
          color: 'white',
          cursor: cantTransfer ? 'not-allowed' : 'pointer',
        },
        disabled: cantTransfer, 
      }}
    
  >
    <div className="flex flex-row  justify-between w-full text-center items-center">
    <div className='flex flex-col w-full items-start'>
    <p className="text-1xl  text-center"> Enter amount to Withdraw </p>
    <Input
      placeholder="Enter user waller Id "
      className=" w-full mt-3"
      type='number'
     value={enterWithdraw}
      onChange={(e) => setEnterWithdraw(e.target.value)}
    />
    {cantTransfer && <p className='mt-2 text-red-400'> insufficient fund </p> }
 </div>

 </div>
  </Modal>
  )
}

export default Withdraw