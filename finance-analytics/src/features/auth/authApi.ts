import { apiSlice } from "../../app/api";

export interface User {
  id: number;
  email: string;
  full_name: string;
  entra_oid: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //  Get Current User (Validates Session)
    getSession: builder.query<User, void>({
      query: () => "/auth/validate",
      providesTags: ["User"],
    }),

    //  Logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      // On logout, clear all cache so the next user doesn't see old data
      invalidatesTags: ["User"],
    }),
    loginWithEntra: builder.mutation<any, { access_token: string }>({
      query: (credentials) => ({
        url: "/auth/exchange",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetSessionQuery,
  useLogoutMutation,
  useLoginWithEntraMutation,
} = authApi;
