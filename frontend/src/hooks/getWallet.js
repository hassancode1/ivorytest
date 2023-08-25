import React, { useEffect, useState } from "react";
import { getLocalAccessToken } from "../utils/constants";

function getWallet() {
  const url = 'https://whale-app-a3hvg.ondigitalocean.app/ivory2/wallet'
  const accessToken = getLocalAccessToken();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchWallet() {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${accessToken}`,
         
        },
      });
      const data = await response.json();
      setWallet(data);
    } catch (error) {
  
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWallet();
  }, []);

  return { wallet, loading , fetchWallet };
}

export default getWallet;
