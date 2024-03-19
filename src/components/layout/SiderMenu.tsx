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
export type MenuItem = Required<MenuProps>["items"][number];

const { Header, Sider, Content } = Layout;
const role = "admin";
const items = sidebarMenuGenerator(adminPaths, role);
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

const SiderMenu = () => {
  return (
    <Sider
      trigger={null}
      // collapsible
      // collapsed={collapsed}
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
        defaultSelectedKeys={["0"]}
        items={items}
      />
    </Sider>
  );
};

export default SiderMenu;
