import React from 'react';
import PostCard from './components/PostCard';
import Navbar from './components/Navbar'; // Import your Navbar component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Profile from './components/Profile';
import Login from './components/Login';
import NotFoundPage from './components/PageNotFound';
import { TokenProvider } from './components/Authenticate';

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
      <TokenProvider>
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

            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </>
  );
}

export default App;

