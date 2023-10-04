import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Breadcrumbs, Link, List, ListItem, Divider, Box, LinearProgress } from '@mui/material';
import {
    Facebook as FacebookIcon,
    GitHub as GitHubIcon,
    Instagram as InstagramIcon,
    Twitter as TwitterIcon,
    Language as LanguageIcon,
} from '@mui/icons-material';

import EditIcon from '@mui/icons-material/Edit';


const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 3,
};

const hrStyle = {
    my: 2,
    borderColor: 'gray',
    borderWidth: '1px', // Increase the border width to make the HR thicker
};

const styles = {
    progressBar: {
        height: '8px', // Adjust the height of the progress bar
        borderRadius: '5px', // Add rounded corners
    },
};



export default function ProfilePage() {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    return (
        <section>
            <Container sx={{ py: 5 }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Breadcrumbs className="bg-light rounded-3 p-3 mb-4">
                            <Link href='#'>Home</Link>
                            <Typography>User Profile</Typography>
                        </Breadcrumbs>
                    </Grid>
                </Grid>

                <Grid container spacing={4}>
                    <Grid item lg={4}>
                        <Card className="mb-4" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    position: 'relative',
                                }}
                            >
                                <div style={{ position: 'relative', display: 'inline-block' }}

                                >
                                    <CardMedia
                                        component="img"
                                        alt="avatar"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                        className="rounded-circle"
                                        style={{ width: '150px' }}
                                        height="150"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    />
                                    {isHovered && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '0',
                                                left: '0',
                                                right: '0',
                                                bottom: '0',
                                                background: 'rgba(0, 0, 0, 0.6)',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: '50%', // Make it circular
                                            }}
                                        >
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                sx={{
                                                    borderRadius: '50%', // Make it circular
                                                    border: '2px solid #fff', // White border
                                                    color: '#fff', // White text
                                                    width: '40px', // Fixed width
                                                    height: '50px', // Fixed height
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center', // Center icon vertically
                                                }}
                                            >
                                                <EditIcon />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <Typography variant="subtitle1" color="textSecondary" paragraph>
                                    Full Stack Developer
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Bay Area, San Francisco, CA
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Button variant="contained" color="primary">
                                        Follow
                                    </Button>
                                    <Button variant="outlined" color="primary" sx={{ ml: 1 }}>
                                        Edit
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>

                        <Card sx={{ minHeight: '300px' }}>
                            <CardContent sx={{ p: 0 }}>
                                <List>
                                    {[
                                        {
                                            icon: <LanguageIcon fontSize="large" color="warning" />,
                                            text: 'https://www.google.com/',
                                        },
                                        {
                                            icon: <GitHubIcon fontSize="large" style={{ color: '#333333' }} />,
                                            text: 'https://github.com/',
                                        },
                                        {
                                            icon: <TwitterIcon fontSize="large" style={{ color: '#55acee' }} />,
                                            text: '@twitter',
                                        },
                                        {
                                            icon: <InstagramIcon fontSize="large" style={{ color: '#ac2bac' }} />,
                                            text: 'https://www.instagram.com/',
                                        },
                                        {
                                            icon: <FacebookIcon fontSize="large" style={{ color: '#3b5998' }} />,
                                            text: 'https://www.facebook.com/',
                                        },
                                    ].map((item, index) => (
                                        <React.Fragment key={index}>
                                            <ListItem sx={listItemStyle}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flex: '1',
                                                    }}
                                                >
                                                    {item.icon}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-end',
                                                        flex: '1',
                                                    }}
                                                >
                                                    {item.text}
                                                </Box>
                                            </ListItem>
                                            {index < 4 && <Divider sx={hrStyle} />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item lg={8}>
                        <Card className="mb-4" sx={{ minHeight: '400px', display: 'flex' }}>
                            <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography variant="subtitle1">Full Name</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="body2" color="textSecondary">
                                            Johnatan Smith
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 2 }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography variant="subtitle1">Email</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="body2" color="textSecondary">
                                            example@example.com
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 2 }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography variant="subtitle1">Phone</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="body2" color="textSecondary">
                                            (097) 234-5678
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 2 }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography variant="subtitle1">Mobile</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="body2" color="textSecondary">
                                            (098) 765-4321
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 2 }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography variant="subtitle1">Address</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="body2" color="textSecondary">
                                            Bay Area, San Francisco, CA
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>



                        <Grid container spacing={4}>
                            <Grid item md={6}>
                                <Card className="mb-4">
                                    <CardContent>
                                        <Typography variant="subtitle1" color="primary">
                                            <span className="font-italic me-1">Assignment</span> Project Status
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            Web Design
                                        </Typography>
                                        <LinearProgress variant="determinate" value={80} color="primary" style={styles.progressBar} />
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            Website Markup
                                        </Typography>
                                        <LinearProgress variant="determinate" value={72} color="primary" style={styles.progressBar} />
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            One Page
                                        </Typography>
                                        <LinearProgress variant="determinate" value={89} color="primary" style={styles.progressBar} />
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            Mobile Template
                                        </Typography>
                                        <LinearProgress variant="determinate" value={55} color="primary" style={styles.progressBar} />
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            Backend API
                                        </Typography>
                                        <LinearProgress variant="determinate" value={66} color="primary" style={styles.progressBar} />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={6}>
                                <Card className="mb-4">
                                    <CardContent>
                                        <Typography variant="subtitle1" color="primary">
                                            <span className="font-italic me-1">Assignment</span> Project Status
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            Web Design
                                        </Typography>
                                        <LinearProgress variant="determinate" value={80} color="primary" style={styles.progressBar} />
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            Website Markup
                                        </Typography>
                                        <LinearProgress variant="determinate" value={72} color="primary" style={styles.progressBar} />
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            One Page
                                        </Typography>
                                        <LinearProgress variant="determinate" value={89} color="primary" style={styles.progressBar} />
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            Mobile Template
                                        </Typography>
                                        <LinearProgress variant="determinate" value={55} color="primary" style={styles.progressBar} />
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            Backend API
                                        </Typography>
                                        <LinearProgress variant="determinate" value={66} color="primary" style={styles.progressBar} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}
