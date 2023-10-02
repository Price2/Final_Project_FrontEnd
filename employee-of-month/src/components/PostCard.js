import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
  Collapse,
  TextField,
  Grid,
} from '@mui/material';
import { ThumbUp, ChatBubbleOutline, Share, Send } from '@mui/icons-material';

const PostCard = ({ post }) => {
  const [isCommenting, setCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCommentClick = () => {
    setCommenting(!isCommenting);
  };

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSend = () => {
    // You can handle sending the comment here.
    // Typically, you would make an API request to post the comment.
    // For now, we'll just clear the comment text field.
    setCommentText('');
  };

  return (
    <Card style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '16px' }}>
      <CardHeader
        avatar={<Avatar aria-label="user-avatar" src={post.user.profilePicture} />}
        title={post.user.name}
        subheader={post.timestamp}
      />
      <CardContent>
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>


      <CardActions disableSpacing>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Button variant="outlined" fullWidth startIcon={<ThumbUp />}>
              Like
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<ChatBubbleOutline />}
              onClick={handleCommentClick}
            >
              Comment
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="outlined" fullWidth startIcon={<Share />}>
              Share
            </Button>
          </Grid>
        </Grid>
      </CardActions>






      <Collapse in={isCommenting}>
        <CardContent>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2} sm={1}>
              <Avatar aria-label="comment-avatar" src={post.user.profilePicture} />
            </Grid>
            <Grid item xs={10} sm={11}>
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
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
