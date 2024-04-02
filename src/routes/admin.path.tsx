import { ReactNode } from "react";
import { TRoutePath } from "../types";
import Dashboard from "../pages/admin/Dashboard";
import Managers from "../pages/admin/userManagement/Managers";

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
    name: "User Management",
    path: "user-management",
    children: [
      {
        name: "Managers",
        path: "managers",
        element: <Managers />,
      },
      {
        name: "Customers",
        path: "customers",
        element: <div>Get all customers</div>,
      },
    ],
  },
  {
    name: "Shop Management",
    path: "shop-management",
    element: <div>Shop Management</div>,
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
