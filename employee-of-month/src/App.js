import React from 'react';
import PostCard from './components/PostCard';
import Navbar from './components/Navbar'; // Import your Navbar component
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from './components/Footer';
import Profile from './components/Profile';
import Login from './components/Login';
// Sample post data
const posts = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      profilePicture: 'https://example.com/avatar1.jpg',
    },
    content: 'This is a sample post content.',
    comments: [
      {
        user: {
          name: 'Alice',
          profilePicture: 'https://example.com/avatar2.jpg',
          content: "Test"
        },
      },
    ],
  },
];

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              <Footer />

            </>
          }>
          </Route>

          <Route path="/profile" element={
            <>
              <Navbar />
              <Profile />
              <Footer />
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




        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

