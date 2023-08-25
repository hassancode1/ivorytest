import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


function useInvite() {
  const url = 'https://whale-app-a3hvg.ondigitalocean.app/ivory2/invite'

  const [loading, setLoading] = useState(true);


  async function createInvite(email) {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
       
        toast.success('You have successfully sent an invite');
      } 
      else{
        toast.error("This email already exits")
      }
    } catch (error) {
     
      console.error('Error sending invite:', error);
    } finally {
      setLoading(false);
    }
  }
  

  return { loading, createInvite };
}

export default useInvite;
