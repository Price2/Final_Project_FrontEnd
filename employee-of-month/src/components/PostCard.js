import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Avatar,
  Typography,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import { ThumbUp, ChatBubbleOutline, Share, Send } from '@mui/icons-material';
import Certificate from './Certificate'
import HallOfFame from './HallOfFame';
import Cookies from 'js-cookie';
import { useAppContext } from './Authenticate';

const PostCard = () => {

  const [posts, setPosts] = useState([]);
  const [isCommenting, setCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const { cookieValue, setCookieValue } = useAppContext();



  useEffect(() => {
  console.log("cookie? ", (cookieValue && Object.keys(cookieValue).length === 0) );
    
    fetch('http://localhost:5555/collective/get_collective_data')
      .then((response) => response.json())
      .then((data) => {
        setPosts([data['employee']]);
        console.log("data: ", data)
        console.log("data retrieved: ", [data['employee']])
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])


  const handleCommentClick = () => {
    setCommenting(!isCommenting);
  };

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSend = () => {
    if (!commentText.trim()) {
      return;
    }
    const newComment = {
      user: {
        profilePicture: 'avatar_url_here',
        name: 'Your Name',
      },
      content: commentText,
      timestamp: new Date().toLocaleString(),
    };

    // Add the new comment to the existing comments
    setComments([...comments, newComment]);

    // Clear the comment text field
    setCommentText('');
  };

  return (
    <>
      {posts.map((post) => {
        return (
          <Card key={post.id} style={{ maxWidth: '850px', margin: '0 auto', marginBottom: '16px', marginTop: '50px' }}>
            <CardHeader
              sx={{textTransform: 'capitalize'}}
              avatar={<Avatar aria-label="user-avatar" />}
              title={post.first_name + " " + post.last_name}
            // subheader={post.timestamp}
            />
            <CardContent>
              <Certificate data={post} />
            </CardContent>

            <CardActions disableSpacing>
              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={4}>
                  <Button variant="outlined" fullWidth startIcon={<ThumbUp />}>
                    Like
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ChatBubbleOutline />}
                    onClick={handleCommentClick}
                  >
                    Comment
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="outlined" fullWidth startIcon={<Share />}>
                    Share
                  </Button>
                </Grid>
              </Grid>
            </CardActions>

            {comments.map((comment, index) => (
              <div key={index}>
                <CardHeader
                  avatar={<Avatar aria-label="comment-avatar" />}
                  title={comment.user.name}
                  subheader={comment.timestamp}
                />
                <CardContent sx={{ display: "flex", justifyContent: 'start', paddingTop: 0 }}>
                  <Typography variant="body1" sx={{ marginLeft: 7.5, padding: 0 }}>{comment.content}</Typography>
                </CardContent>
              </div>
            ))}

            <CardContent>
              <Grid container spacing={1} alignItems="flex-start">
                <Grid item xs={2} sm={1}>
                  <Avatar aria-label="comment-avatar" />
                </Grid>
                <Grid item xs={10} sm={11}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12}>
                      <TextField
                        multiline
                        placeholder="Write a comment..."
                        variant="outlined"
                        fullWidth
                        value={commentText}
                        onChange={handleCommentTextChange}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'right', marginTop: '8px' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<Send />}
                        onClick={handleCommentSend}
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )

      })}
      <HallOfFame />
    </>
  );
};

export default PostCard;
