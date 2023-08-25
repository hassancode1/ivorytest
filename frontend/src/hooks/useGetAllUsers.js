import React, { useEffect, useState } from "react";


function useGetAllUsers() {
  const url = 'https://whale-app-a3hvg.ondigitalocean.app/ivory2/users'

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
         
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
  
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading ,fetchUsers};
}

export default useGetAllUsers;
