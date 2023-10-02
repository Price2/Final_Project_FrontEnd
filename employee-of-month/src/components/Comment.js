import React, { useState } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  TextField,
  Button,
  styled,
} from '@mui/material';

const CommentContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  backgroundColor: 'lightgray', // Customize the comment's background color
}));

const CommentContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
}));

const CommentTextField = styled(TextField)({
  flex: 1,
});

const CommentWrapper = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(1), // Adjust the margin here as needed
}));

function Comment({ user }) {
  const [commentText, setCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);

  const handleCommentClick = () => {
    setIsCommenting(!isCommenting);
  };

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = () => {
    // You can handle comment submission here, e.g., sending the comment to the server
    console.log('Comment submitted:', commentText);
    setCommentText(''); // Clear the comment text field
  };

  return (
    <CommentContainer>
      <CommentContent>
        <CommentWrapper>
          <Avatar src={user.profilePicture} />
        </CommentWrapper>
        <CommentTextField
          variant="outlined"
          size="small"
          placeholder="Write a comment.."
          multiline
          rows={1}
          value={commentText}
          onChange={handleCommentTextChange}
          onFocus={handleCommentClick}
        />
        {isCommenting && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleCommentSubmit}
          >
            Comment
          </Button>
        )}
      </CommentContent>
    </CommentContainer>
  );
}

export default Comment;
