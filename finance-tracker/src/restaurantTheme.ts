import { createTheme } from "@mui/material/styles";

export const restaurantTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFC72C",
      contrastText: "#27251F",
    },
    secondary: {
      main: "#DA291C",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#27251F",
      paper: "#1F1E1B",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#E0E0E0",
    },
    error: {
      main: "#DA291C",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#27251F",
          borderBottom: "2px solid #FFC72C",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #404040",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: "bold",
        },
      },
    },
  },
});
