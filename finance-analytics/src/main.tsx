import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'; // 👈 Redux Provider
import { store } from './app/store';

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";


import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Login } from './features/auth/Login';
import { msalConfig } from './authConfig';

// Initialize MSAL
const msalInstance = new PublicClientApplication(msalConfig);

const theme = createTheme({
  palette: { mode: 'light' },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> {/* Redux for RTK Query */}
      <MsalProvider instance={msalInstance}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* For now, we just render Login. Later add Router here. */}
          <Login /> 
        </ThemeProvider>
      </MsalProvider>
    </Provider>
  </React.StrictMode>,
)