import { useLocation, Outlet } from "react-router-dom";
import { useGetSessionQuery } from "../authApi";
import { Box, CircularProgress } from "@mui/material";
import { API_URL } from "../../../variables";

export const RequireAuth = () => {
  const location = useLocation();
  const { data: user, isLoading, isError } = useGetSessionQuery();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // If Error (401) or No User -> Redirect to Analytics Login
  if (isError || !user) {
    // We use standard window.location for cross-domain redirect
    window.location.href = `${API_URL}/corporate/login?redirect=/corporate${location.pathname}`;
    return null;
  }

  //  If Success -> Render the Children (Dashboard, etc.)
  return <Outlet />;
};
