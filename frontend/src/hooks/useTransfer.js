import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getLocalAccessToken } from "../utils/constants";
import getWallet from "./getWallet";

function useTransfer() {
  const url = "https://whale-app-a3hvg.ondigitalocean.app/ivory2/wallet/transfer";

  const accessToken = getLocalAccessToken();
  const [loading, setLoading] = useState(true);

  async function createTransfer(postData) {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify( postData ),
      });

      if (response.ok) {
        const responseData = await response.json();

        toast.success("You have succesfully deposited");
      } else {
        toast.error("This email already exits");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, createTransfer };
}

export default useTransfer;
