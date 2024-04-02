import { baseApi } from "../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMangers: builder.query({
      query: () => {
        console.log("calling get managers rtk");
        return {
          url: "/user/get-managers",
          method: "GET",
        };
      },
      // keepUnusedDataFor: 1,
    }),
    getCustomers: builder.query({
      query: () => ({
        url: "/user/get-customers",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMangersQuery, useGetCustomersQuery } = adminApi;
