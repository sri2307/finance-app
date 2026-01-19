import { useMsal } from "@azure/msal-react";
import { useLoginWithEntraMutation } from "../../app/api";
import { Box, Button, Typography, Paper, Container, CircularProgress } from "@mui/material";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import { useState } from "react";
import { loginRequest } from "../../authConfig";

export const Login = () => {
  const { instance } = useMsal();
  
  // Use the RTK Query Mutation
  const [loginWithEntra, { isLoading }] = useLoginWithEntraMutation();
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    try {
      setErrorMsg("");
      
      // 1. Trigger Microsoft Popup
      const msalResponse = await instance.loginPopup(loginRequest);
      
      // 2. Call Backend via RTK Query
      // This sends the token and waits for the 'Set-Cookie' response header
      await loginWithEntra({ access_token: msalResponse.idToken }).unwrap();

      // 3. Redirect User
      // Check if they came from the Tracker app
      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get("redirect");

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        // Default to internal dashboard
        window.location.href = "/dashboard";
      }

    } catch (err: any) {
      console.error("Login Failed", err);
      setErrorMsg("Login failed. Please try again.");
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper elevation={3} sx={{ p: 5, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Corporate App
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Sign in .
          </Typography>

          {errorMsg && (
            <Typography color="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Typography>
          )}

          <Button 
            variant="contained" 
            size="large"
            startIcon={isLoading ? <CircularProgress size={20} color="inherit"/> : <MicrosoftIcon />}
            onClick={handleLogin}
            disabled={isLoading}
            sx={{ mt: 2, bgcolor: "#2f2f2f", '&:hover': { bgcolor: "#000" } }}
          >
            {isLoading ? "Signing in..." : "Sign in with SSO"}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};