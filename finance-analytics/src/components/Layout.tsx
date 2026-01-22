import { Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import {
  useGetSessionQuery,
  useLogoutMutation,
} from "../features/auth/authApi";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { API_URL } from "../variables";


export const Layout = () => {
  const { data: user, isLoading } = useGetSessionQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout().unwrap();
    window.location.href = `${API_URL}/corporate/login`;
  };

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

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Corporate App
          </Typography>

          {user ? (
            <Box display="flex" alignItems="center" gap={2}>
              
              <Button
                color="inherit" 
                startIcon={<RestaurantMenuIcon />} 
                component="a"
                href="/restaurant"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textTransform: 'none' }} 
              >
                Restaurant App
              </Button>

              <Typography variant="body2">
                {user.full_name || user.email}
              </Typography>
              
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : null}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};