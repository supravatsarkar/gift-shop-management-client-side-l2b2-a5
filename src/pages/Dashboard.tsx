import React from "react";
import { useGetUserQuery } from "../redux/features/auth/authApi";
import { useGetMangersQuery } from "../redux/features/admin/adminApi";
import { useGetDashboardSummeryQuery } from "@/redux/features/sale/saleApi";

export default function Dashboard() {
  let { data } = useGetDashboardSummeryQuery(undefined);
  data = data?.data;
  console.log("dashboard data=>", data);
  const dashboardItems = [
    { text: "Active Products", value: data?.totalActiveProducts || 0 },
    { text: "Available Products", value: data?.totalAvailableProduct || 0 },
    { text: "Out of Stock", value: data?.totalOutOfStockProducts || 0 },
    { text: "Sales Count", value: data?.totalSalesCount || 0 },
    {
      text: "Sales Amount",
      value: Number(data?.totalSalesAmount || 0).toFixed(2),
    },
  ];
  return (
    <div>
      <h2 className="text-slate-500 font-bold text-center text-4xl p-4 mb-3 mt-0 pt-1">
        Gift Shop Management Dashboard
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center ">
        {dashboardItems.map((item, index) => (
          <div
            key={index}
            className="bg-primary-200 rounded-xl p-3 text-white font-bold"
          >
            <p>{item.text} </p>
            <p className="text-5xl">{item.value}</p>
          </div>
        ))}

        {/* <div>
          <p>Available Products </p>
          <p>{data?.totalAvailableProduct}</p>
        </div>
        <div>
          <p>Out of Stock</p>
          <p>{data?.totalOutOfStockProducts}</p>
        </div>
        <div>
          <p>Sales Amount</p>
          <p>{Number(data?.totalSalesAmount).toFixed(2) || 0}</p>
        </div>
        <div>
          <p>Sales Count</p>
          <p>{data?.totalSalesCount}</p>
        </div> */}
      </div>
    </div>
  );
}
