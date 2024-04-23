import { baseApi } from "../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (payload) => ({
        url: "product/create-product",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `product/update-product/${id}`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `product/delete-product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteBulkProduct: builder.mutation({
      query: (ids: string[]) => {
        return {
          url: `product/delete-bulk-product`,
          method: "DELETE",
          body: {
            ids: ids,
          },
        };
      },
      invalidatesTags: ["products"],
    }),
    getAllActiveProducts: builder.query({
      query: ({
        limit,
        page,
        sortby,
        filter,
      }: {
        limit: number;
        page: number;
        sortby: string;
        filter: Record<string, unknown>;
      }) => {
        console.log("getAllActiveProducts RTK", {
          limit,
          page,
          filter,
          sortby,
        });
        let url = `/product/get-all-active-products?limit=${limit}&page=${page}&sortby=${sortby}&order=desc`;
        if (Object.keys(filter).length) {
          url = url.concat(
            `&${Object.keys(filter)[0]}=${Object.values(filter)[0]}`
          );
        }

        return {
          url: url,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "/product/get-all-products?order=desc",
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    getInventory: builder.query({
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
        let url = `/product/get-inventory?limit=${limit}&page=${page}&sortby=${sortby}&order=desc`;
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
  }),
  //   overrideExisting: true,
});

export const {
  useGetAllActiveProductsQuery,
  useGetAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteBulkProductMutation,
  useGetInventoryQuery,
} = productApi;
