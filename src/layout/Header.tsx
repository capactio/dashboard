import React, { useContext } from "react";
import "./Header.css";

import { Button, Layout, Menu } from "antd";
import { AuthContext } from "../Auth";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";

const { Header: AntHeader } = Layout;

function Header() {
  const authCtx = useContext(AuthContext);

  return (
    <AntHeader className="main-header">
      <div className="main-header-logo" />
      <Menu theme="dark" mode="horizontal" className="main-header-menu">
        <SubMenu key="SubMenu" title="User" icon={<UserOutlined />}>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={() => authCtx.logout()}
          >
            Logout
          </Menu.Item>
        </SubMenu>
      </Menu>
    </AntHeader>
  );
}

export default Header;
