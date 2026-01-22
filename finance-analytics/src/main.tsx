import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'; 
import { store } from './app/store';

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";


import { ThemeProvider, CssBaseline } from '@mui/material';
import { msalConfig } from './authConfig';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { corporateTheme } from './corporateTheme';

const msalInstance = new PublicClientApplication(msalConfig);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> 
      <MsalProvider instance={msalInstance}>
        <ThemeProvider theme={corporateTheme}>
          <CssBaseline />
          <BrowserRouter basename="/corporate"> 
          <App/>
          </BrowserRouter>
        </ThemeProvider>
      </MsalProvider>
    </Provider>
  </React.StrictMode>,
)