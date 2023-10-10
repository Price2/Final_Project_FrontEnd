import React, { useState, useEffect } from 'react';
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
  const [hallfOfFameMembers, setHallfOfFameMembers] = useState([])
  useEffect(() => {

    fetch('http://localhost:5555/employee/get_hof?query_type=wins&number_limit=4')
      .then((response) => response.json())
      .then((hallOfFame) => {

        console.log("Hall of famers: ", hallOfFame)
        console.log("Hall of famers direct: ", hallOfFame.data.objects)
        setHallfOfFameMembers(hallOfFame.data.objects)

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  return (
    <section style={{ backgroundColor: '#f8f9fa', padding: '50px 0', margin: "50px 0px" }}>
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
                {member.image_url ?
                  <CardMedia
                  component="img"
                  height="auto"
                  image={member.image_url}
                  alt={member.first_name}
                />
                    : <CardMedia
                  component="img"
                  height="auto"
                  image={"https://cdn.vectorstock.com/i/preview-1x/62/59/default-avatar-photo-placeholder-profile-icon-vector-21666259.jpg"}
                  alt={member.first_name}
                />
              }
                
                <CardContent style={{display:'flex', flexDirection:'column', flexGrow: 1, justifyContent:"center", alignItems:"center", textTransform:'capitalize' }}>
                  <Typography variant="h6" gutterBottom>
                    {member.first_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.job_title}
                  </Typography>
                  <Typography sx={{marginTop:'25px'}}>
                   Testing asjdiasfijaij
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
