import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container, CircularProgress } from '@mui/material';
import { useGetSessionQuery, useLogoutMutation } from '../features/auth/authApi';

const AUTH_APP_URL = 'https://d2ezff9rhb01hg.cloudfront.net'

export const Layout = () => {
  // 1. Automatically fetch user on load
  const { data: user, isLoading } = useGetSessionQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout().unwrap();
    // Redirect to Analytics/Login App
    window.location.href = `${AUTH_APP_URL}/login`;
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Top Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Finance Tracker
          </Typography>
          
          {user ? (
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body2">
                {user.full_name || user.email}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button color="inherit" href={`${AUTH_APP_URL}/login`}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};