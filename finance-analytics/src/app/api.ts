import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1', // Proxies to Backend
    credentials: 'include', // 👈 CRITICAL: Allows backend to set the HttpOnly Cookie
  }),
  endpoints: (builder) => ({
    // The Mutation to send Microsoft Token to Backend
    loginWithEntra: builder.mutation<any, { access_token: string }>({
      query: (credentials) => ({
        url: '/auth/exchange',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginWithEntraMutation } = apiSlice;