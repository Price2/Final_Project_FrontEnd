// Unauthorized.js
import React, { useEffect } from 'react';
import { styled } from '@mui/material';

const GlobalStyles = styled('div')({
  '& html, & body': {
    height: '100%',
    fontFamily: 'Raleway, sans-serif',
    backgroundColor: '#342643', // Replace with your desired background color
    margin: 0,
    padding: 0,
  },
});

const TextWrapper = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Title = styled('div')({
  fontSize: '5em',
  fontWeight: 700,
  color: '#EE4B5E',
});

const Subtitle = styled('div')({
  fontSize: '40px',
  fontWeight: 700,
  color: '#1FA9D6',
});

const Isi = styled('div')({
  fontSize: '18px',
  textAlign: 'center',
  margin: '30px',
  padding: '20px',
  color: 'white',
});

const Button = styled('a')({
  fontWeight: 700,
  border: '2px solid #EE4B5E',
  textDecoration: 'none',
  padding: '15px',
  textTransform: 'uppercase',
  color: '#EE4B5E',
  borderRadius: '26px',
  transition: 'all 0.2s ease-in-out',
  display: 'inline-block',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#EE4B5E',
    color: 'white',
  },
});

const Unauthorized = () => {

  useEffect(() => {
    // Set the background color programmatically
    document.body.style.backgroundColor = '#342643'; // Replace with your desired background color

    // Clean up the style when the component unmounts
    return () => {
      document.body.style.backgroundColor = ''; // Reset to default background color or remove this line
    };
  }, []);
  return (
    <GlobalStyles>
      <TextWrapper>
        <Title data-content="404">403 - ACCESS DENIED</Title>
        <Subtitle>Oops, You don't have permission to access this page.</Subtitle>
        <Isi>
          A web server may return a 403 Forbidden HTTP status code in response to a
          request from a client for a web page or resource to indicate that the
          server can be reached and understood the request, but refuses to take any
          further action. Status code 403 responses are the result of the web server
          being configured to deny access, for some reason, to the requested resource
          by the client.
        </Isi>
        <Button href="/">Go to homepage</Button>
      </TextWrapper>
    </GlobalStyles>
  );
};

export default Unauthorized;
