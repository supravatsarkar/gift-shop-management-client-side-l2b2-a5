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
    getSales: builder.query({
      query: ({
        limit,
        page,
        sortby,
        search,
      }: {
        limit: number;
        page: number;
        sortby: string;
        search: string;
      }) => {
        console.log("getInventory RTK", { limit, page, search });
        let url = `/product/get-inventory?limit=${limit}&page=${page}&sortby=${sortby}`;
        if (search) {
          url = `${url}&search=${search}`;
        }
        return {
          url: url,
          method: "GET",
        };
      },
      providesTags: ["sales"],
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
  }),
  //   overrideExisting: true,
});

export const {
  useMarkAsSaleMutation,
  useGetSalesQuery,
  useGetSalesHistoryGraphQuery,
} = saleApi;
