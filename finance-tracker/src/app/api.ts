import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../variables';


const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  credentials: 'include', 
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
  
    const refreshResult = await baseQuery(
      { url: '/auth/refresh', method: 'POST' }, 
      api, 
      extraOptions
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
     
      const currentUrl = window.location.pathname;
      window.location.href = `${API_URL}/corporate/login?redirect=${currentUrl}`;
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'], 
  endpoints: () => ({}), 
});