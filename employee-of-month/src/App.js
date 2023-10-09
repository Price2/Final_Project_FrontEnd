import React, { useEffect } from 'react';
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
  return (
    <>
      <TokenProvider>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                  <PostCard/>
                <Footer />

              </>
            }>
            </Route>

            <Route path="/profile" element={
              <>
                {cookie === undefined ? <Navigate to="/login"/>: <> <Navbar />
                <Profile />
                <Footer /></>}
               
              </>
            }>
            </Route>
            <Route path="/login" element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            }>
            </Route>
            <Route path="/unauthorized" element={
              <>
                <Unauthorized/>
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

