import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function TokenProvider({ children }) {
    const [cookieValue, setCookieValue] = useState({});

    useEffect(() => {
      const cookie = Cookies.get('JWTToken');
  
      if (cookie !== undefined) {
        console.log('JWTToken:', cookie);
        setCookieValue({'JWTToken' :cookie });
      } else {
        console.log('JWTToken cookie does not exist.');
        // You can set a default value here or leave it empty as needed
        // setCookieValue('');
      }
    }, []);
    
  return (
    <AuthContext.Provider value={{ cookieValue, setCookieValue }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AuthContext);
}
