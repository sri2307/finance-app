import { apiSlice } from '../../app/api';

export interface User {
  id: number;
  email: string;
  full_name: string;
  entra_oid: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get Current User (Validates Session)
    getSession: builder.query<User, void>({
      query: () => '/auth/validate',
      providesTags: ['User'],
    }),
    
    // 2. Logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      // On logout, clear all cache so the next user doesn't see old data
      invalidatesTags: ['User', 'Expenses'], 
    }),
  }),
});

export const { useGetSessionQuery, useLogoutMutation } = authApi;