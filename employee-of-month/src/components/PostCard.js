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
  CircularProgress,
} from '@mui/material';
import { ThumbUp, ChatBubbleOutline, Share, Send } from '@mui/icons-material';
import Certificate from './Certificate'
import HallOfFame from './HallOfFame';
import Cookies from 'js-cookie';
import { useAppContext } from './Authenticate';
import jwt_decode from "jwt-decode";


const PostCard = () => {

  const [posts, setPosts] = useState([]);
  const [isCommenting, setCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const { cookieValue, setCookieValue } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingComment, setIsSendingComment] = useState(false); // Initialize as false



  useEffect(() => {
    console.log("cookie? ", (cookieValue && Object.keys(cookieValue).length === 0));

    fetch('http://localhost:5555/collective/get_collective_data')
      .then((response) => response.json())
      .then((data) => {

        console.log("data: ", data)
        console.log("data retrieved: ", [data['employee']])
        const responseComments = data.comments;
        const newComments = responseComments.map((comment) => ({
          user: {
            profilePicture: 'avatar_url_here',
            name: comment.commentor,
          },
          content: comment.comment_detail,
          timestamp: new Date().toLocaleString(),
        }));
        setPosts([data['employee']]);
        setComments(newComments);
        setIsLoading(false);

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

  const handleCommentSend = async () => {
    if (!commentText.trim()) {
      return;
    }
    setIsSendingComment(true);

    // const newComment = {
    //   user: {
    //     profilePicture: 'avatar_url_here',
    //     name: 'Your Name',
    //   },
    //   content: commentText,
    //   timestamp: new Date().toLocaleString(),
    // };

    // setComments([...comments, newComment]);
    // setCommentText('');



    try {
      console.log("Comment text: ", commentText)
      // Actual POST request to post a comment
      const cookie = cookieValue
      console.log("cookie before request: ", cookie)
      const response = await fetch('http://localhost:5555/eotmdetail/add_eotmdetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': cookie,
        },
        body: JSON.stringify({
          comment_detail: commentText,
          commentor: "daniel",
        }),
      });

      if (response.ok) {
        // If the request is successful, parse the response JSON (if applicable)
        const responseData = await response.json();

        console.log("response of comment: ", JSON.stringify(responseData));
        const commentDetail = responseData.data.object.comment_detail;
        const commentor = responseData.data.object.commentor;

        const newComment = {
          user: {
            profilePicture: 'avatar_url_here',
            name: commentor,
          },
          content: commentDetail,
          timestamp: new Date().toLocaleString(),
        };

        setComments([...comments, newComment]);
        setCommentText('');
      } else {
        console.error('Request failed:', response.status, response.statusText);
      }

      setIsSendingComment(false);
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here
      setIsSendingComment(false); // Make sure to reset loading state in case of an error
    }
  };

  // useEffect(() => {
  //   if (Object.keys(cookieValue).length > 0)
  //   {
  //     const decode = jwt_decode(cookieValue)
  //     console.log("decoded token: ", decode)
  //    }
    
  // }, [cookieValue]);
  return (
    <>
      {posts.map((post) => {
        return (
          <Card key={post.id} style={{ maxWidth: '850px', margin: '0 auto', marginBottom: '16px', marginTop: '50px' }}>
            <CardHeader
              sx={{ textTransform: 'capitalize' }}
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
                  title={<Typography variant="body1" fontWeight="bold" sx={{textTransform:'capitalize'}}>
                    {comment.user.name}
                  </Typography>}
                  subheader={comment.timestamp}
                  sx={{ paddingBottom: '5px' }}
                />
                <CardContent sx={{ display: "flex", justifyContent: 'start', paddingTop: 0, }}>
                  <Typography variant="body1" sx={{ marginLeft: 7.5, padding: 0, fontSize:'0.9rem' }}>{comment.content}</Typography>
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
                        {isSendingComment ? (
                          <>
                            <CircularProgress size={16} color="inherit" />
                            &nbsp; Sending...
                          </>
                        ) : (
                          'Send'
                        )}
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
