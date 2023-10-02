import React from 'react';
import { CssBaseline, Container, Grid } from '@mui/material';
import PostCard from './components/PostCard';

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
        },
      },
      // Add more comments here
    ],
  },
  // Add more posts here
];

function App() {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default App;
