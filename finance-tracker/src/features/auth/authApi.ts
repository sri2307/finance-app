import { apiSlice } from '../../app/api';

export interface User {
  id: number;
  email: string;
  full_name: string;
  entra_oid: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSession: builder.query<User, void>({
      query: () => '/auth/validate',
      providesTags: ['User'],
    }),
    
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'], 
    }),
  }),
});

export const { useGetSessionQuery, useLogoutMutation } = authApi;