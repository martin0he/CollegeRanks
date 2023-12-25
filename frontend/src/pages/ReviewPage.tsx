import { Box, Typography } from '@mui/material';

export const ReviewPage: React.FC = () => {
  return (
    <Box py={4}>
      <Typography variant="h2">How it works</Typography>
      <Typography variant="h2" mb={1} fontWeight={500}>Martin</Typography>
      <Typography variant="h5" mb={3}>I code dumb shit</Typography>
      <Typography maxWidth={500}>Thank you for reading - please hang yourself</Typography>
    </Box>
  );
};
