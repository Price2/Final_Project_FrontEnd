import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const hallfOfFameMembers = [
  {
    name: 'Flora Nyra',
    role: 'Product Manager',
    image: 'https://bootstrapbrain.com/demo/components/teams/team-1/assets/img/team-img-1.jpg',
  },
  {
    name: 'Evander Mac',
    role: 'Art Director',
    image: 'https://bootstrapbrain.com/demo/components/teams/team-1/assets/img/team-img-5.jpg',
  },
  {
    name: 'Taytum Elia',
    role: 'Investment Planner',
    image: 'https://bootstrapbrain.com/demo/components/teams/team-1/assets/img/team-img-2.jpg',
  },
  {
    name: 'Wylder Elio',
    role: 'Financial Analyst',
    image: 'https://bootstrapbrain.com/demo/components/teams/team-1/assets/img/team-img-4.jpg',
  },
];

function HallOfFame() {
  return (
    <section style={{ backgroundColor: '#f8f9fa', padding: '50px 0', margin:"50px 0px" }}>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Our Team
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              We are a group of innovative, experienced, and proficient teams. You will love to collaborate with us.
            </Typography>
            <hr style={{ width: '50%', margin: '0 auto 50px', borderColor: '#343a40' }} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {hallfOfFameMembers.map((member, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="auto"
                  image={member.image}
                  alt={member.name}
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

export default HallOfFame;
