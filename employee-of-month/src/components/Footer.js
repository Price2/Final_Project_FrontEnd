import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <footer style={{ backgroundColor: 'lightgray', padding: '20px' }}>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="center" sx={{ borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
          <Grid item xs={12} lg={6} display={{ xs: 'none', lg: 'block' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Get connected with us on social networks:
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6} textAlign={{ xs: 'center', lg: 'end' }}>
            <IconButton color="inherit" href="#" style={{ color: 'gray' }}>
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" href="#" style={{ color: 'gray' }}>
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" href="#" style={{ color: 'gray' }}>
              <GoogleIcon />
            </IconButton>
            <IconButton color="inherit" href="#" style={{ color: 'gray' }}>
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" href="#" style={{ color: 'gray' }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton color="inherit" href="#" style={{ color: 'gray' }}>
              <GitHubIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6} md={3} lg={3} sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              <GitHubIcon fontSize="large" sx={{ marginRight: '5px' }} />
              Company name
            </Typography>
            <Typography variant="body2">
              Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Products
            </Typography>
            <Typography variant="body2">
              <a href='#!' style={{ textDecoration: 'none', color: 'gray' }}>Angular</a>
            </Typography>
            <Typography variant="body2">
              <a href='#!' style={{ textDecoration: 'none', color: 'gray' }}>React</a>
            </Typography>
            <Typography variant="body2">
              <a href='#!' style={{ textDecoration: 'none', color: 'gray' }}>Vue</a>
            </Typography>
            <Typography variant="body2">
              <a href='#!' style={{ textDecoration: 'none', color: 'gray' }}>Laravel</a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Useful links
            </Typography>
            <Typography variant="body2">
              <a href='#!' style={{ textDecoration: 'none', color: 'gray' }}>Pricing</a>
            </Typography>
            <Typography variant="body2">
              <a href='#!' style={{ textDecoration: 'none', color: 'gray' }}>Settings</a>
            </Typography>
            <Typography variant="body2">
              <a href='#!' style={{ textDecoration: 'none', color: 'gray' }}>Orders</a>
            </Typography>
            <Typography variant="body2">
              <a href='#!' style={{ textDecoration: 'none', color: 'gray' }}>Help</a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Contact
            </Typography>
            <Typography variant="body2">
              <GitHubIcon fontSize="small" sx={{ marginRight: '5px' }} />
              New York, NY 10012, US
            </Typography>
            <Typography variant="body2">
              <GitHubIcon fontSize="small" sx={{ marginRight: '5px' }} />
              info@example.com
            </Typography>
            <Typography variant="body2">
              <GitHubIcon fontSize="small" sx={{ marginRight: '5px' }} />
              + 01 234 567 88
            </Typography>
            <Typography variant="body2">
              <GitHubIcon fontSize="small" sx={{ marginRight: '5px' }} />
              + 01 234 567 89
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ display:"flex", justifyContent:"center",marginTop: '20px', padding: '10px 0', fontWeight: 'bold' }}>
            © 2021 Copyright: <a href='https://mdbootstrap.com/' style={{ textDecoration: 'none', color: 'white' }}> Employee of the month org.</a>
            </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
