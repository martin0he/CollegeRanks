import { Box, Typography } from "@mui/material";
import ChartComponent from "../components/rankings-layout/Chart";

export const RankingsPage: React.FC = () => {
  return (
    <Box py={4} px={3}>
      <Typography variant="h4" fontWeight="bold">
        University Rankings
      </Typography>
      <ChartComponent />
    </Box>
  );
};
