import { Box, Grid, Typography } from "@mui/material";
import CustomCard from "../components/home-layout/card-component";
import BarChartIcon from "@mui/icons-material/BarChart";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SearchIcon from "@mui/icons-material/Search";

export const HomePage: React.FC = () => {
  return (
    <Box marginTop="36px">
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{
              textDecoration: "underline",
              fontSize: "2em",
              fontWeight: "bold",
            }}
          >
            How it works
          </Typography>
          <Typography sx={{ color: "black" }}>
            CollegeRanks is a tool used to gauge the population’s ranking of
            colleges and universities around the world based on users’ reviews
            and nothing more. Simply sign up, enter your college/university, and
            rate your school based on the metrics provided.
          </Typography>
        </Grid>
        <Grid item xs={12} py={2}>
          <Grid container>
            <Grid item md={4} px="5px" py="5px">
              <CustomCard
                title="Check Rankings"
                icon={<BarChartIcon />}
                body="You can check the current Top 10 universities and their respective scores, as well as filter by country for more specific results. [Updates every 60 seconds]"
              />
            </Grid>
            <Grid item md={4} px="5px" py="5px">
              <CustomCard
                title="Rate School"
                icon={<RateReviewIcon />}
                body="Rate your school and submit your evaluation with the provided sliders and metrics, uploading a formulated weighted average to represent your opinion."
              />
            </Grid>
            <Grid item md={4} px="5px" py="5px">
              <CustomCard
                title="Check School"
                icon={<SearchIcon />}
                body="Want to see how your school stacks up? Search for your university to view its metrics and overall score. Get a rough sense for your college life through your screen."
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
