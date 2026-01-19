import { useLocation, Outlet } from 'react-router-dom';
import { useGetSessionQuery } from '../authApi';
import { Box, CircularProgress } from '@mui/material';

const AUTH_APP_URL = 'https://d2ezff9rhb01hg.cloudfront.net'

export const RequireAuth = () => {
  const location = useLocation();
  const { data: user, isLoading, isError } = useGetSessionQuery();

  // 1. Show Spinner while checking session
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // 2. If Error (401) or No User -> Redirect to Analytics Login
  if (isError || !user) {
    // We use standard window.location for cross-domain redirect
    window.location.href = `${AUTH_APP_URL}/login?redirect=/tracker${location.pathname}`;
    return null; // Don't render anything else
  }

  // 3. If Success -> Render the Children (Dashboard, etc.)
  return <Outlet />;
};