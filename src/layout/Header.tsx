import React, { useContext } from "react";
import "./Header.css";

import { Layout, Menu } from "antd";
import { AuthContext } from "../Auth";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";

const { Header: AntHeader } = Layout;

function Header() {
  const authCtx = useContext(AuthContext);

  return (
    <AntHeader className="header">
      <Link className="header-logo" to="/">
        <img
          className="header-logo-image"
          src="/logo_white.svg"
          alt="Capact Logo"
        />
        <b className="header-logo-title">Capact</b>
      </Link>
      <Menu theme="dark" mode="horizontal" className="header-menu">
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
