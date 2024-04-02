import React, { useState } from "react";

import type { MenuProps } from "antd";
import { Badge, Button, Layout, Menu } from "antd";
import SiderMenu from "./SiderMenu";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
const { Header, Sider, Content } = Layout;
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/features/auth/authSlice";
import { useGetUserQuery } from "../../redux/features/auth/authApi";

type MenuItem = Required<MenuProps>["items"][number];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  console.log({ location });
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: userDetails } = useGetUserQuery(undefined);
  console.log({ userDetails });
  const dispatch = useDispatch();

  //   const {
  //     token: { colorBgContainer, borderRadiusLG },
  //   } = theme.useToken();

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <SiderMenu />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p>{user?.email}</p>
            <Badge count={user?.role} />
          </div>
          <Button onClick={() => dispatch(logout())}>Logout</Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100%",
            scrollBehavior: "smooth",
            overflow: "auto",
            // height: "100vh",

            // minHeight: "100vh",
            // background: colorBgContainer,
            // borderRadius: borderRadiusLG,
          }}
        >
          <div style={{}}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
