import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getLocalAccessToken } from "../utils/constants";
import getWallet from "./getWallet";

function useWalletWithdraw() {
  const url = "https://whale-app-a3hvg.ondigitalocean.app/ivory2/wallet/withdraw";

  const accessToken = getLocalAccessToken();
  const [loading, setLoading] = useState(true);

  async function createWithdraw(postData) {
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

        toast.success("You have succesfully withdraw ");
      } else {
        toast.error("cant");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, createWithdraw};
}

export default useWalletWithdraw
