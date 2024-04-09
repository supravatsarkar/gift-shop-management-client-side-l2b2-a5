/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { logout, setUser } from "../auth/authSlice";
import { decodeJwtToken } from "../../../utils";

const baseQuery = fetchBaseQuery({
  prepareHeaders: (hearders, { getState }) => {
    const token = (getState() as RootState).auth.token as string;
    if (token) {
      hearders.append("authorization", token);
    }
    return hearders;
  },
  // credentials: "include", // AVAILABLE VALUES "same-origin", "include" , "omit"
  baseUrl: "http://localhost:5000/api/v1",
});

const baseQueryWithRefreshToken: BaseQueryFn<
  any,
  BaseQueryApi,
  FetchBaseQueryError
> = async (args, api, extraOptions): Promise<any> => {
  let data = await baseQuery(args, api, extraOptions);
  console.log("baseQueryWithRefreshToken data=>", data);
  if (data?.error?.status === 401) {
    const renewalRefreshTokenRes = await fetch(
      "http://localhost:5000/api/v1/auth/renew-access-token",
      {
        method: "POST",
        credentials: "include",
      }
    );
    const jsonData = await renewalRefreshTokenRes.json();
    console.log({ jsonData });
    if (jsonData?.data?.accessToken) {
      console.log("newToken", jsonData?.data.accessToken);
      const user = decodeJwtToken(jsonData?.data.accessToken);
      api.dispatch(setUser({ user, token: jsonData?.data.accessToken }));
      data = await baseQuery(args, api, extraOptions);
      console.log("again call baseQuery", data);
    } else {
      api.dispatch(logout());
    }
  }

  console.log("data from custom baseQuery", data);

  return data;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  keepUnusedDataFor: 20,
  // refetchOnMountOrArgChange: 20,
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["products", "sales"],
  // baseQuery: fetchBaseQuery({
  //   prepareHeaders: (hearders, { getState }) => {
  //     const token = (getState() as RootState).auth.token as string;
  //     if (token) {
  //       hearders.append("authorization", token);
  //     }
  //     return hearders;
  //   },
  //   credentials: "include", // AVAILABLE VALUES "same-origin", "include" , "omit"
  //   baseUrl: "http://localhost:5000/api/v1",
  // }),
  //   endpoints: (builder) => ({
  //     getUsers: builder.query({
  //       query: () => "users",
  //     }),
  //   }),
  endpoints: () => ({}), // empty endpoint for split api based on service
});
