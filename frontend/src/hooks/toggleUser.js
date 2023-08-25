import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getLocalAccessToken } from "../utils/constants";
import getWallet from "./getWallet";

function toggleUser() {
  const url = "https://whale-app-a3hvg.ondigitalocean.app/ivory2/toggleUser";

  const accessToken = getLocalAccessToken();
  const [loading, setLoading] = useState(true);

  async function toggleuser(postData) {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify( postData ),
      });

      if (response.ok) {
        const responseData = await response.json();
{
    postData.isActive ?
    toast.success("You have Activated a user"):
    toast.error("You have deactivated a user");
}
        
      } 
    } catch (error) {
      console.error("Error sending invite:", error);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  return { loading, toggleuser };
}

export default toggleUser;
