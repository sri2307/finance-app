import { useMsal } from "@azure/msal-react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Container,
  CircularProgress,
} from "@mui/material";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import StorefrontIcon from "@mui/icons-material/Storefront"; // Added for visual flair
import { useState } from "react";
import { loginRequest } from "../../../authConfig";
import { useLoginWithEntraMutation } from "../authApi";

export const Login = () => {
  const { instance } = useMsal();
  const [loginWithEntra, { isLoading }] = useLoginWithEntraMutation();
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    try {
      setErrorMsg("");
      const msalResponse = await instance.loginPopup(loginRequest);
      await loginWithEntra({ access_token: msalResponse.idToken }).unwrap();

      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get("redirect");

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        window.location.href = "/corporate/dashboard";
      }
    } catch (err: any) {
      console.error("Login Failed", err);
      setErrorMsg("Authentication failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={12}
        sx={{
          p: 5,
          textAlign: "center",
          borderRadius: 4,
          borderTop: "6px solid #FFC72C",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            bgcolor: "#DA291C",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            mb: 3,
            boxShadow: 3,
          }}
        >
          <StorefrontIcon sx={{ color: "white", fontSize: 32 }} />
        </Box>

        <Typography
          variant="h4"
          fontWeight="800"
          gutterBottom
          sx={{ color: "#27251F" }}
        >
          Corporate Portal
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ mb: 4 }}
        >
          Secure access for franchise administrators and regional managers.
        </Typography>

        {errorMsg && (
          <Paper
            variant="outlined"
            sx={{ bgcolor: "#fff0f0", borderColor: "#ffcdd2", p: 1, mb: 2 }}
          >
            <Typography color="error" variant="body2" fontWeight="bold">
              {errorMsg}
            </Typography>
          </Paper>
        )}

        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={
            isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <MicrosoftIcon />
            )
          }
          onClick={handleLogin}
          disabled={isLoading}
          sx={{
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1rem",
            textTransform: "none",
            borderRadius: 2,
            bgcolor: "#DA291C",
            "&:hover": {
              bgcolor: "#B01F14",
              boxShadow: "0px 4px 12px rgba(218, 41, 28, 0.4)",
            },
            "&:disabled": {
              bgcolor: "#e0e0e0",
            },
          }}
        >
          {isLoading ? "Verifying..." : "Sign in with SSO"}
        </Button>

        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 4, color: "#9e9e9e" }}
        >
          © 2026 McDonald's Corporation • IT Security
        </Typography>
      </Paper>
    </Container>
  );
};
