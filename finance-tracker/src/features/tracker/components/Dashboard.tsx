import { Paper, Typography, Box } from '@mui/material';

export const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Restaurant Dashboard
      </Typography>
      
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No records to display yet.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          (We will build the Restaurant Dashboard here)
        </Typography>
      </Paper>
    </Box>
  );
};