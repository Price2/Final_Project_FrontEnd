import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// Define keyframes animation
const floatingAnimation = keyframes`
  from { transform: translateY(0px); }
  65%  { transform: translateY(15px); }
  to   { transform: translateY(-0px); }
`;

const RootContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: 'url("https://assets.codepen.io/1538474/star.svg"), linear-gradient(to bottom, #05007A, #4D007D)',
  backgroundAttachment: 'fixed',
  overflow: 'hidden',
});

const Mars = styled('div')({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: '27vmin',
  background: 'url("https://assets.codepen.io/1538474/mars.svg") no-repeat bottom center',
  backgroundSize: 'cover',
});

const Logo404 = styled('img')({
  position: 'absolute',
  margin: 'auto',
  left: 0,
  right: 0,
  top: '16vmin',
  width: '30vmin',
  '@media (max-width: 480px) and (min-width: 320px)': {
    top: '45vmin',
  },
});

const Meteor = styled('img')({
  position: 'absolute',
  right: '2vmin',
  top: '16vmin',
});

const Title = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 600,
  textAlign: 'center',
  fontSize: '5vmin',
  marginTop: '31vmin',
  [theme.breakpoints.down('sm')]: {
    marginTop: '65vmin',
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 400,
  textAlign: 'center',
  fontSize: '3.5vmin',
  marginTop: '-1vmin',
  marginBottom: '9vmin',
}));

const BtnBack = styled(Button)({
  border: '1px solid white',
  color: 'white',
  height: '5vmin',
  padding: '12px',
  fontFamily: 'Nunito, sans-serif',
  textDecoration: 'none',
  borderRadius: '5px',
  '&:hover': {
    background: 'white',
    color: '#4D007D',
  },
  '@media (max-width: 480px) and (min-width: 320px)': {
    fontSize: '3.5vmin',
  },
});

const Astronaut = styled('img')({
  position: 'absolute',
  top: '18vmin',
  left: '10vmin',
  height: '30vmin',
  animation: `${floatingAnimation} 3s infinite ease-in-out`,
  '@media (max-width: 480px) and (min-width: 320px)': {
    top: '2vmin',
  },
});

const Spaceship = styled('img')({
  position: 'absolute',
  bottom: '15vmin',
  right: '24vmin',
  '@media (max-width: 480px) and (min-width: 320px)': {
    width: '45vmin',
    bottom: '18vmin',
  },
});

const NotFoundPage = () => {
  return (
    <RootContainer>
      <Mars></Mars>
      <Logo404 src="https://assets.codepen.io/1538474/404.svg" alt="404" />
      <Meteor src="https://assets.codepen.io/1538474/meteor.svg" alt="Meteor" />
      <Title variant="h3">Oh no!!</Title>
      <Subtitle variant="subtitle1">
        You’re either misspelling the URL <br /> or requesting a page that's no longer here.
      </Subtitle>
      <Container align="center">
        <BtnBack variant="outlined" href="/">
          Back home
        </BtnBack>
      </Container>
      <Astronaut src="https://assets.codepen.io/1538474/astronaut.svg" alt="Astronaut" />
      <Spaceship src="https://assets.codepen.io/1538474/spaceship.svg" alt="Spaceship" />
    </RootContainer>
  );
};

export default NotFoundPage;
