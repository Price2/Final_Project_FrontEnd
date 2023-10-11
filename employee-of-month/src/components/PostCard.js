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
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const PostCard = ({ userFN }) => {

  const [posts, setPosts] = useState([]);
  const [isCommenting, setCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const { cookieValue, setCookieValue } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingComment, setIsSendingComment] = useState(false);
  const [disableComments, setDisableComments] = useState(false);
  const [disableLikes, setDisableLikes] = useState(false);

  const [loggedUserFN, setLoggedUserFN] = useState({});
  const [isLiked, setisLiked] = useState(0)
  const [prevIsLiked, setPrevIsLiked] = useState(0);
  const [postNumOfLikes, setPostNumOfLikes] = useState(0)

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

  useEffect(() => {
    if (Object.keys(cookieValue).length > 0) {
      setDisableComments(false)
      setDisableLikes(false)
    }
    else {
      setDisableComments(true)
      setDisableLikes(true)
    }
  }, [cookieValue])
  


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

    try {
      console.log("Comment text: ", commentText)
      const cookie = cookieValue?.JWTToken
      const user_fn = (loggedUserFN?.first_name || "Anonymous") + " " + (loggedUserFN?.last_name || "User");
      console.log("cookie before request: ", cookie)
      const response = await fetch('http://localhost:5555/eotmdetail/add_eotmdetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': cookie,
        },
        body: JSON.stringify({
          comment_detail: commentText,
          commentor: user_fn,
        }),
      });

      if (response.ok) {
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
      setIsSendingComment(false);
    }
  };

  useEffect(() => {
    if (Object.keys(userFN).length > 0) {
      setLoggedUserFN(userFN)
      console.log("Am i being set?")
    }
  }, [userFN]);


  const handleLike = () => {
    console.log("LIKED? ", isLiked)
    setisLiked((prevIsLiked) => (prevIsLiked === 1 ? 0 : 1));

  }

  useEffect(() => {
    const cookie = cookieValue?.JWTToken
    if (isLiked === 1 && prevIsLiked !== 1) {
      console.log("LIKED increment? ", isLiked)
      fetch(`http://localhost:5555/employee/patch_like_count?query_mode=increment`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "access_token": cookie
          },
        }
      )
        .then((response) => response.json())
        .then((likeResponse) => {
          setPosts([likeResponse.data.object])
          console.log("Patch likes response increment: ", likeResponse)

        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

    }
    if (isLiked === 0 && prevIsLiked !== 0) {
      console.log("LIKED decrement? ", isLiked)

      fetch(`http://localhost:5555/employee/patch_like_count?query_mode=decrement`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "access_token": cookie
          },
        }
      )
        .then((response) => response.json())
        .then((likeResponse) => {
          setPosts([likeResponse.data.object])
          console.log("Patch likes response decrement: ", likeResponse)
          console.log("Patch likes response decrement array: ", [likeResponse.data.object])

        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
    setPrevIsLiked(isLiked);

  }, [isLiked]);

  console.log("Testing likes ", posts.map((post) =>{return(post.number_of_likes)}) )
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


            <Grid container spacing={1} justifyContent={"left"}>
              {isLiked  ?
                <Grid item xs={4}>
                  <Typography sx={{ textAlign: 'center' }} variant="body2" color="gray">
                    {post.number_of_likes === 0 || post.number_of_likes === 1 ? "You're the first to like this post": `You and ${post.number_of_likes-1} others Liked this post`}
                  </Typography>
                </Grid> :
                <Grid item xs={4}>
                <Typography sx={{ textAlign: 'center' }} variant="body2" color="gray">
                  {post.number_of_likes} Liked this post
                </Typography>
              </Grid>
              }
            </Grid>

            <CardActions disableSpacing>
              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={4}>
                  {isLiked ?
                    <Button variant="outlined" fullWidth startIcon={<ThumbUp />} onClick={handleLike} disabled={disableLikes}>
                      Like
                    </Button> : <Button variant="outlined" fullWidth startIcon={<ThumbUpOffAltIcon />} onClick={handleLike} sx={{ color: 'gray' }} disabled={disableLikes}>
                      Like
                    </Button>
                  }
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
                  title={<Typography variant="body1" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
                    {comment.user.name}
                  </Typography>}
                  subheader={comment.timestamp}
                  sx={{ paddingBottom: '5px' }}
                />
                <CardContent sx={{ display: "flex", justifyContent: 'start', paddingTop: 0, }}>
                  <Typography variant="body1" sx={{ marginLeft: 7.5, padding: 0, fontSize: '0.9rem' }}>{comment.content}</Typography>
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
                        disabled={disableComments}
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
