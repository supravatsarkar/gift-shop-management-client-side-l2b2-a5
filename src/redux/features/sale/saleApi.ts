import { baseApi } from "../api/baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    markAsSale: builder.mutation({
      query: ({ productId, payload }) => ({
        url: `/sale/mark-as-sale/${productId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["sales"],
    }),
    getSalesHistoryGraph: builder.query({
      query: ({ category, year }) => {
        return {
          url: `/sale/view-sales-history?category=${category}&year=${year}`,
          method: "GET",
        };
      },
      providesTags: ["sales"],
    }),
    getDashboardSummery: builder.query({
      query: () => {
        return {
          url: `/user/get-dashboard-summery`,
          method: "GET",
        };
      },
      providesTags: ["sales", "products"],
    }),
  }),
  //   overrideExisting: true,
});

export const {
  useMarkAsSaleMutation,
  useGetSalesHistoryGraphQuery,
  useGetDashboardSummeryQuery,
} = saleApi;
