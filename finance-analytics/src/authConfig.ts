// Fix: Use 'import type' for both Configuration and PopupRequest
import type { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: "0b420f47-0671-4ee5-b918-895dd38314b5", // 👈 Replace with actual Client ID
        authority: "https://login.microsoftonline.com/3274563b-285c-4c7b-9569-429c162da3e6", // 👈 Replace with actual Tenant ID
        redirectUri: "/", 
    },
    cache: {
        cacheLocation: "sessionStorage", 
        storeAuthStateInCookie: false,
    }
};

export const loginRequest: PopupRequest = {
    scopes: ["User.Read", "openid", "profile"]
};

 