import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import logo_svg from '../images/logo.svg';
import { useAppContext } from './Authenticate';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { Divider } from '@mui/material';


const pages = ['Home'];
const settings = ['Profile', 'Dashboard', 'Reset Password', 'Logout'];

function ResponsiveAppBar({ setuserFN }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { cookieValue, setCookieValue } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState([]);

  const navigate = useNavigate();


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    navigate("/");
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5555/auth/employee_logout', {
        method: 'POST',
      });

      if (response.ok) {
        Cookies.remove('JWTToken');
        setCookieValue({})
        setAnchorElUser(null);
        navigate('/');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log("Cookie Value: ", cookieValue)
    if (Object.keys(cookieValue).length !== 0) {
      const decode = jwt_decode(cookieValue?.JWTToken)
      fetch(`http://localhost:5555/employee/get_employee?user_id=${decode?.id}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((user) => {
          console.log("Data retrieved from user: ", user.data.object)
          setLoggedUser([user?.data?.object])
          setuserFN({ first_name: user.data.object.first_name, last_name: user.data.object.last_name })
          return;
        })
      console.log("logged user: ", loggedUser)

    }

  }, [cookieValue]);


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="/" style={{ textDecoration: 'none', alignSelf: "flex-start" }}>
            <img className="img-fluid" src={logo_svg} alt="Logo" style={{ maxWidth: '60px', marginRight: '5px', color: 'blue' }} />
          </a>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (

                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>

              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {Object.keys(cookieValue).length > 0 ?
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu} sx={{ marginRight: '15px', textTransform: "capitalize" }}>
                    <Avatar sx={{ marginRight: "15px" }} /> {loggedUser.map((user) => { return (user.first_name + " " + user.last_name) })}
                  </MenuItem>
                  <Divider />
                  
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={setting === 'Logout' && !isLoading ? handleLogout : handleCloseUserMenu}>
                      {setting === 'Logout' && isLoading ? (
                        <>
                          Logging out... <span className="spinner"></span>
                        </>
                      ) : setting === 'Profile' ? (
                        <Link to="/profile" sx={{ textDecoration: "none" }}>
                          <Typography textAlign="center">{setting}</Typography>
                        </Link>
                      ) : setting === 'Reset Password' ? (
                        <Link to="/reset_password" style={{ textDecoration: 'none', color:'inherit' }}>
                          <Typography textAlign="center">{setting}</Typography>
                        </Link>
                      ) : (
                        <Typography textAlign="center">{setting}</Typography>
                      )}
                    </MenuItem>
                  ))}


                </Menu>
              </>
              :
              <Stack direction="row" spacing={1}>
                <Button variant="contained" href="/login" sx={{ backgroundColor: "#0077ff" }}>
                  <span>Login <LoginIcon /></span>
                </Button>

              </Stack>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;