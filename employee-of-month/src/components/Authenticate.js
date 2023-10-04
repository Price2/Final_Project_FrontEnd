import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function TokenProvider({ children }) {
    const [cookieValue, setCookieValue] = useState({});

    useEffect(() => {
        // Cookies.set('JWTToken', 'de7fa7f88a87dh8jk8bnxz99978qweqdhdfqiqodqw7e6564545', { expires: 7 });

        const cookie = Cookies.get('JWTToken');
    
        if (cookie !== undefined) {
          console.log('JWTToken:', cookie);
          setCookieValue(cookie);
        } else {
            console.log('JWTToken cookie does not exist.');
            // setCookieValue('')
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
