import { Box, Grid, Typography } from '@mui/material';

export const HomePage: React.FC = () => {

  return (
    <Box py={6}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} direction="column" alignItems="center" justifyContent="center">
          <Box display="flex" justifyContent="center" alignItems="center" boxShadow={2} borderRadius="13px">
            
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ textDecoration: 'underline', fontSize: '2em', fontWeight: 'bold' }}>
            How it works
          </Typography>
          <p>
            CollegeRanks is a tool used to gauge the population’s ranking of colleges and universities around the world
            based on users’ reviews and nothing more. Simply sign up, enter your college/university, and rate your
            school based on the metrics provided.
          </p>
        </Grid>
      </Grid>
    </Box>
  );
};
