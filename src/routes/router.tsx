import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routeGenerator";
import adminPaths from "./admin.path";
import Login from "../pages/Login";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Register from "../pages/Register";
import managerPaths from "./manager.path";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute children={<App />} />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute children={<App />} />,
    // children: [
    //   {
    //     // path: "dashboard",
    //     path: "",
    //     // index: true,
    //     element: (
    //       <div>
    //         <h1>Dashboard</h1>
    //       </div>
    //     ),
    //   },
    //   {
    //     path: "shop-management",
    //     element: (
    //       <div>
    //         <h1>Shop-Management</h1>
    //       </div>
    //     ),
    //   },
    //   {
    //     path: "sales-management",
    //     element: (
    //       <div>
    //         <h1>Sales Management</h1>
    //       </div>
    //     ),
    //   },
    //   {
    //     path: "sales-history",
    //     element: (
    //       <div>
    //         <h1>Sales History</h1>
    //       </div>
    //     ),
    //   },
    // ],
    children: routeGenerator(adminPaths),
  },
  {
    path: "manager",
    element: <ProtectedRoute children={<App />} />,
    children: routeGenerator(managerPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
