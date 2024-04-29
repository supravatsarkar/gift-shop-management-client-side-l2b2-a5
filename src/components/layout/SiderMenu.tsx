import { Layout, Menu, MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { sidebarMenuGenerator } from "../../utils/sidebarMenuGenerator";
import adminPaths from "../../routes/admin.path";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks/hooks";
import managerPaths from "../../routes/manager.path";
import { roles } from "../../config/constants";
export type MenuItem = Required<MenuProps>["items"][number];

const { Header, Sider, Content } = Layout;

// const items: MenuItem[] = [
//   {
//     label: <NavLink to={`/${role}`}>Dashboard</NavLink>,
//     key: "0",
//     icon: <PieChartOutlined />,
//   },
//   {
//     label: <NavLink to={`/${role}/shop-management`}>Shop Management</NavLink>,
//     key: "1",
//     icon: <DesktopOutlined />,
//   },
//   {
//     label: <NavLink to={"/"}>Option 2</NavLink>,
//     key: "2",
//     icon: <ContainerOutlined />,
//   },
//   {
//     label: <NavLink to={"/"}>Navigation One</NavLink>,
//     key: "sub1",
//     icon: <MailOutlined />,
//     children: [
//       {
//         label: <NavLink to={"/"}>Option 5</NavLink>,
//         key: "5",
//       },
//       {
//         label: <NavLink to={"/"}>Option 6</NavLink>,
//         key: "6",
//       },
//       {
//         label: <NavLink to={"/"}>Option 7</NavLink>,
//         key: "7",
//       },
//     ],
//   },
// ];

const SiderMenu = ({ collapsed }: { collapsed: boolean }) => {
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role as string;
  let items;
  switch (role) {
    case roles.admin:
      items = sidebarMenuGenerator(adminPaths, role);
      break;
    case roles.manager:
      items = sidebarMenuGenerator(managerPaths, role);
      break;
    // case roles.customer:
    //   items = sidebarMenuGenerator(customerPaths, role);
    //   break;
    default:
      items = sidebarMenuGenerator(adminPaths, role);
      break;
  }
  return (
    <Sider
      trigger={null}
      // collapsible
      collapsed={collapsed}
      // breakpoint="lg"
      // collapsedWidth="0"
      // onBreakpoint={(broken) => {
      //   console.log(broken);
      // }}
      // onCollapse={(collapsed, type) => {
      //   console.log(collapsed, type);
      // }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["Dashboard"]}
        // forceSubMenuRender={true}
        // selectable={true}
        items={items}
      />
    </Sider>
  );
};

export default SiderMenu;
