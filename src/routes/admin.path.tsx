import { ReactNode } from "react";
import { TRoutePath } from "../types";
import Dashboard from "../pages/admin/Dashboard";

const routeGenerator = (paths: TRoutePath[]) => {
  return paths.map((item) => {});
};
const adminPaths: TRoutePath[] = [
  {
    name: "Dashboard",
    path: "",
    // index: true,
    element: <Dashboard />,
  },
  {
    name: "Shop Management",
    path: "shop-management",
    children: [
      {
        name: "test sub",
        path: "test-sub",
        element: <div>Test sub item</div>,
      },
    ],
  },
  {
    name: "Sales Management",
    path: "sales-management",
    element: <div>Sales Management</div>,
  },
  {
    name: "Sales History",
    path: "sales-history",
    element: <div>Sales History</div>,
  },
];

export default adminPaths;
