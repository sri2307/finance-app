import { createTheme } from "@mui/material/styles";

export const corporateTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#DA291C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFC72C",
      contrastText: "#27251F",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#27251F",
      secondary: "#595959",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#DA291C",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
  },
});
