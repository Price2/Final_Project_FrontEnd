import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Button } from '@mui/material';

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
  const [isMostWins, setIsMostWins] = useState(true)
  const [isMostCommended, setIsMostCommended] = useState(false)

  useEffect(() => {
    if (isMostWins) {
      fetch('http://localhost:5555/employee/get_hof?query_type=wins&number_limit=4')
        .then((response) => response.json())
        .then((hallOfFame) => {

          console.log("Hall of famers wins: ", hallOfFame)
          console.log("Hall of famers direct wins: ", hallOfFame.data.objects)
          setHallfOfFameMembers(hallOfFame.data.objects)

        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
    if (isMostCommended) {
      fetch('http://localhost:5555/employee/get_hof?query_type=recommends&number_limit=4')
        .then((response) => response.json())
        .then((hallOfFame) => {

          console.log("Hall of famers recommends: ", hallOfFame)
          console.log("Hall of famers direct recommends : ", hallOfFame.data.objects)
          setHallfOfFameMembers(hallOfFame.data.objects)

        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [isMostWins, isMostCommended])



  const handleMostWins = () => {
    setIsMostWins(true)
    setIsMostCommended(false)
  }

  const handleMostCommended = () => {
    setIsMostCommended(true)
    setIsMostWins(false)
  }

  return (
    <section style={{ backgroundColor: '#f8f9fa', padding: '50px 0', margin: "50px 0px" }}>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Hall of Fame
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Below is the hall of fame for the top employees who achieved the most employee of the month title.
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '10px' }}>
              {isMostWins ? <>
                <Button variant="contained" endIcon={<EmojiEventsIcon />} onClick={handleMostWins} >
                  Most wins
                </Button>
                <Button variant="outlined" endIcon={<ThumbUpAltIcon />} onClick={handleMostCommended}>
                  Most commended
                </Button>

              </> :
                <>
                  <Button variant="outlined" endIcon={<EmojiEventsIcon />} onClick={handleMostWins} >
                    Most wins
                  </Button>
                  <Button variant="contained" endIcon={<ThumbUpAltIcon />} onClick={handleMostCommended}>
                    Most commended
                  </Button>
                </>
              }

            </div>
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

                <CardContent style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: "center", alignItems: "center", textTransform: 'capitalize' }}>
                  <Typography variant="h6" gutterBottom>
                    {member.first_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.job_title}
                  </Typography>
                  <Typography sx={{ marginTop: '25px' }}>
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
