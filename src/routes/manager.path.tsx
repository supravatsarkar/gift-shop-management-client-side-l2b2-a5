import { ReactNode } from "react";
import { TRoutePath } from "../types";
import Dashboard from "../pages/admin/Dashboard";
import ShopManagement from "../pages/ShopManagement";

// const routeGenerator = (paths: TRoutePath[]) => {
//   return paths.map((item) => {});
// };
const managerPaths: TRoutePath[] = [
  {
    name: "Dashboard",
    path: "",
    // index: true,
    element: <Dashboard />,
  },
  {
    name: "Shop Management",
    path: "shop-management",
    element: <ShopManagement />,
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

export default managerPaths;
