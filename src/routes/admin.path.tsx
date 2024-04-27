import { ReactNode } from "react";
import { TRoutePath } from "../types";
import Dashboard from "../pages/Dashboard";
import Managers from "../pages/admin/userManagement/Managers";
import SalesHistory from "@/pages/SalesHistory";
import { ChartBar, Gauge, ShoppingBagOpen, Tag, Users } from "phosphor-react";
import SalesManagement from "@/pages/SalesManagement";
import ShopManagement from "@/pages/ShopManagement";

const routeGenerator = (paths: TRoutePath[]) => {
  return paths.map(() => {});
};
const adminPaths: TRoutePath[] = [
  {
    name: "Dashboard",
    path: "",
    icon: <Gauge size={15} />,
    element: <Dashboard />,
  },
  {
    name: "User Management",
    path: "user-management",
    icon: <Users size={15} />,
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

export default adminPaths;
