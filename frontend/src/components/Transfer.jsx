import React,{useMemo} from 'react'

  import useGetAllUsers from '../hooks/useGetAllUsers';
import { Modal, Input } from "antd";
const Transfer = ({transferModal,handleTransfer,wallet, handleTransfercancel ,enterTransfer,setEnterTransfer, enterRecipient, setEnterRecipient}) => {
const {users} = useGetAllUsers()
const recipientNotFound = !users?.some(user => user.id === parseInt(enterRecipient));

const cantTransfer = useMemo(() => {
  if (!wallet || !wallet.wallet) {
    return false; 
  }
  return parseFloat(wallet?.wallet.amount) < parseFloat(enterTransfer);
}, [wallet, enterTransfer]);
console.log(cantTransfer)


  return (
    <Modal
    title={ <h2 className='text-2xl  font-bold'>Transfer to Ivory pay Account</h2>}
    visible={transferModal}
    onOk={handleTransfer} 
    onCancel={handleTransfercancel}
    okText="Send" 
    okButtonProps={{
      style: {
        backgroundColor: '#1890ff',
        color: 'white',
        cursor: cantTransfer || recipientNotFound? 'not-allowed' : 'pointer',
      },
      disabled: cantTransfer, 
    }}
    
  >
    <div className="flex flex-row  justify-between w-full text-center items-center">
    <div className='flex flex-col w-full items-start'>
    <p className="text-1xl "> Recipient wallet Id </p>
    <Input
      placeholder="Enter user waller Id "
      className=" w-full mt-3"
       name='recipient'
      value={enterRecipient}
      type='number'
      onChange={(e) => setEnterRecipient(e.target.value)}
    />
       {recipientNotFound && <p className='mt-2 text-red-400'> Recipient not found </p> }
     <p className="text-1xl "> Amount </p>
    <Input
      placeholder="Enter user waller Id "
      className=" w-full mt-3"
      type='number'
      name='amount'
      value={enterTransfer}
      onChange={(e) => setEnterTransfer(e.target.value)}
    />
     {cantTransfer && <p className='mt-2 text-red-400'> insufficient fund </p> }
 </div>

 </div>
  </Modal>
  )
}

export default Transfer