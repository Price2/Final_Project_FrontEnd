import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './Authenticate';
import LockResetIcon from '@mui/icons-material/LockReset';
import Alert from '@mui/material/Alert';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {

    const { cookieValue, setCookieValue } = useAppContext();
    const navigate = useNavigate();
    const [errorText, setErrorText] = React.useState('');
    const [successText, setSuccessText] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [isReset, setIsReset] = React.useState({ success: false, error: false })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });

        // Cookies.set('JWTToken', 'de7fa7f88a87dh8jk8bnxz99978qweqdhdfqiqodqw7e6564545', { expires: 7 });
        // setCookieValue({ 'JWTToken': 'de7fa7f88a87dh8jk8bnxz99978qweqdhdfqiqodqw7e6564545' })
        // navigate('/')

        const username = data.get('username');
        const password = data.get('password');
        const cookie = cookieValue?.JWTToken
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5555/auth/employee_password_reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': cookie
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsReset({ ...isReset, success: true, error: false })
                setSuccessText('Password has been reset successfully!')
            } else {
                setErrorText('Invalid username or password.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorText('An error occurred. Please try again later.');
            setIsReset({ ...isReset, success: false, error: true })
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        const cookies = Cookies.get('JWTToken')
        console.log("Reset Pass cookie: ", cookieValue);
        if (cookies && Object.keys(cookieValue).length === 0) {
            navigate("/unauthorized", { state: { from: '/reset_password' } })
        }

    }, [cookieValue]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container>
                <Grid container component="main" sx={{ height: '100vh', margin: '50px 0px' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockResetIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Reset Password
                            </Typography>
                            {isReset.success &&
                                <Alert severity="success" sx={{marginTop:'5px', marginBottom:'5px'}}>{successText}</Alert>
                            }
                            {isReset.error &&
                                <Alert severity="error" sx={{marginTop:'5px', marginBottom:'5px'}}>{errorText}</Alert>
                            }
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="New Password"
                                    type="password"
                                    id="password"
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            Resetting Password <CircularProgress size={16} color="inherit" sx={{ ml: '5px' }} />
                                        </>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </Button>


                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container >
        </ThemeProvider>
    );
}