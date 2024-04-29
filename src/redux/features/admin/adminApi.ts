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
      providesTags: ["users"],
      // keepUnusedDataFor: 1,
    }),
    getCustomers: builder.query({
      query: () => ({
        url: "/user/get-customers",
        method: "GET",
      }),
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/user/update-user-profile/${id}`,
        body: payload,
        method: "PUT",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetMangersQuery,
  useGetCustomersQuery,
  useUpdateUserProfileMutation,
} = adminApi;
