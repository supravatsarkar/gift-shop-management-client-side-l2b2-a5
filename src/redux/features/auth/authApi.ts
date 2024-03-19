import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
    login: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
  //   overrideExisting: true,
});

export const { useGetUsersQuery, useLoginMutation } = authApi;
