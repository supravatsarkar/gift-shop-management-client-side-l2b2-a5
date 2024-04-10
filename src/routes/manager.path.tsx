import { ReactNode } from "react";
import { TRoutePath } from "../types";
import Dashboard from "../pages/admin/Dashboard";
import ShopManagement from "../pages/ShopManagement";
import {
  ChartBar,
  ChartBarHorizontal,
  Gauge,
  ShoppingBagOpen,
  Tag,
} from "phosphor-react";
import SalesManagement from "@/pages/SalesManagement";
import SalesHistory from "@/pages/SalesHistory";

// const routeGenerator = (paths: TRoutePath[]) => {
//   return paths.map((item) => {});
// };
const managerPaths: TRoutePath[] = [
  {
    name: "Dashboard",
    path: "",
    // index: true,
    element: <Dashboard />,
    icon: <Gauge size={15} />,
  },
  {
    name: "Shop Management",
    path: "shop-management",
    icon: <ShoppingBagOpen size={15} />,
    element: <ShopManagement />,
  },
  {
    name: "Sales Management",
    path: "sales-management",
    icon: <Tag size={15} />,
    element: <SalesManagement />,
  },
  {
    name: "Sales History",
    path: "sales-history",
    icon: <ChartBar size={15} />,
    element: <SalesHistory />,
  },
];

export default managerPaths;
