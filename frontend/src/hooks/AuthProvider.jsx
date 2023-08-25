
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from './useCurrentUser';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
  });
  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
    setAuthState({
      isAuthenticated: false,
      userRole: null,
    });
    navigate('/login'); // Redirect user to login page
  };

  
  const [loading, setLoading] = useState(false); 
  const {user} = useCurrentUser()
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    const userRole = localStorage.getItem('userRole');

    if (jwtToken && userRole) {
      setAuthState({
        isAuthenticated: true,
        userRole: userRole,
      });
    }
  }, []);

  const login = async (postData) => {
    const url = 'https://whale-app-a3hvg.ondigitalocean.app/ivory2/login';
    try {
      setLoading(true); 

      const response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const jwtToken = responseData.token;
        if (jwtToken) {
          localStorage.setItem('jwtToken', jwtToken);
          localStorage.setItem('userRole', responseData.userRole); // Store user role
          setAuthState({
            isAuthenticated: true,
            userRole: responseData.userRole,
          });
          toast.success('You have successfully logged in');
          const nav =`${user.isAdmin ? "/dashboard" : "/mywallet"} `
          navigate(nav);
        } else {
          toast.error('No token found in the response');
        }
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred while logging in');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, loading , logout}}>
      {children}
    </AuthContext.Provider>
  );
};
