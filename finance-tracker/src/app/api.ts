import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// The Public URL for the Analytics App (Login)
const AUTH_APP_URL = 'https://d2ezff9rhb01hg.cloudfront.net'

// 1. Define the Base Query
const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  // 👈 CRITICAL: Tells browser to send HttpOnly Cookies with every request
  prepareHeaders: (headers) => {
    return headers;
  },
  credentials: 'include', 
});

// 2. Wrap it to handle 401s (Token Refresh & Redirect)
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // A. Try to Refresh Token (Browser sends 'refresh_token' cookie)
    // We use a separate fetch call for refresh to avoid infinite loops
    const refreshResult = await baseQuery(
      { url: '/auth/refresh', method: 'POST' }, 
      api, 
      extraOptions
    );

    if (refreshResult.data) {
      // B. Retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // C. Refresh Failed -> Redirect to Analytics App to Login
      // We pass ?redirect= so they come back to the tracker after login
      const currentUrl = window.location.pathname;
      window.location.href = `${AUTH_APP_URL}/login?redirect=${currentUrl}`;
    }
  }
  return result;
};

// 3. Create the API Slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Expenses', 'User'], // For Caching
  endpoints: () => ({}), // We inject endpoints from features/ folder later
});