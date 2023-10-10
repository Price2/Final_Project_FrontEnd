import React, { useEffect, useState } from 'react';
import PostCard from './components/PostCard';
import Navbar from './components/Navbar'; // Import your Navbar component
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from './components/Footer';
import Profile from './components/Profile';
import Login from './components/Login';
import NotFoundPage from './components/PageNotFound';
import { TokenProvider } from './components/Authenticate';
import "./index.css"
import Unauthorized from './components/Unauthorized';
import Cookies from 'js-cookie';



function App() {
  const cookie = Cookies.get("JWTToken")
  const [userFullName, setUserFullName] = useState('')

  const setFullName = (fullname) => {
    setUserFullName(fullname)
  }
  useEffect(() => {
    console.log("User full name: ", userFullName)
  }, [userFullName]);
  return (
    <>
      <TokenProvider>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={
              <>
                <Navbar setuserFN={setFullName} />
                <PostCard userFN={userFullName} />
                <Footer />

              </>
            }>
            </Route>

            <Route path="/profile" element={
              <>
                {cookie === undefined ? <Navigate to="/login" /> : <> <Navbar setuserFN={setFullName} />
                  <Profile />
                  <Footer /></>}

              </>
            }>
            </Route>
            <Route path="/login" element={
              <>
                <Navbar setuserFN={setFullName} />
                <Login />
                <Footer />
              </>
            }>
            </Route>
            <Route path="/unauthorized" element={
              <>
                <Unauthorized />
              </>
            }>
            </Route>

            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </>
  );
}

export default App;

