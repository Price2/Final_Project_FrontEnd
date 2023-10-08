import React, { useEffect } from 'react';
import PostCard from './components/PostCard';
import Navbar from './components/Navbar'; // Import your Navbar component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Profile from './components/Profile';
import Login from './components/Login';
import NotFoundPage from './components/PageNotFound';
import { TokenProvider } from './components/Authenticate';
import jwt_decode from "jwt-decode";

// Sample post data
// const posts = [
//   {
//     id: 1,
//     user: {
//       name: 'John Doe',
//       profilePicture: 'https://example.com/avatar1.jpg',
//     },
//     content: 'This is a sample post content.',
//     comments: [
//       {
//         user: {
//           name: 'Alice',
//           profilePicture: 'https://example.com/avatar2.jpg',
//           content: "Test"
//         },
//       },
//     ],
//   },
// ];



function App() {
  // useEffect(() => {
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbCJ9.-LlP-SILuTKSbf5jVWuQeSqlmI7Hxmhk1h7ioE15yqE';
  //   const decodedToken = jwt_decode(token);
  //   console.log("JWT Decoded ", decodedToken)

  // }, [])
  
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:5555/collective/get_collective_data')
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setPosts([data['employee']]);
  //     console.log("data retrieved: ", [data['employee']])
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //   });
  // }, [])
  return (
    <>
      <TokenProvider>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                {/* {posts.map((post) => ( */}
                  <PostCard/>
                {/* ))} */}
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

