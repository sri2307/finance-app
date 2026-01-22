import type { Configuration, PopupRequest } from "@azure/msal-browser";
import { MS_CLIENT_ID, MS_TENANT_ID } from "./variables";

export const msalConfig: Configuration = {
  auth: {
    clientId: MS_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${MS_TENANT_ID}`,
    redirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest: PopupRequest = {
  scopes: ["User.Read", "openid", "profile"],
};
