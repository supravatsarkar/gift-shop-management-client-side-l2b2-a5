import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: payload,
        };
      },
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

export const { useGetUserQuery, useLoginMutation, useRegisterMutation } =
  authApi;
