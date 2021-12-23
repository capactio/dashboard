import { Layout, Menu as AntMenu } from "antd";
import React, { useState } from "react";
import {
  ApartmentOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Item } = AntMenu;
const { Sider } = Layout;

function Menu() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    {
      name: "Hub",
      route: "/hub/interface-groups",
      icon: <ApartmentOutlined />,
    },
    {
      name: "Actions",
      route: "/actions",
      icon: <AppstoreOutlined />,
    },
    {
      name: "TypeInstances",
      route: "/type-instances",
      icon: <ProfileOutlined />,
    },
    {
      name: "Policy",
      route: "/policy",
      icon: <ContainerOutlined />,
    },
  ];

  const currentRoute = links.find((elem) =>
    location.pathname.startsWith(elem.route)
  );

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
      className="site-layout-background"
    >
      <AntMenu mode="inline" selectedKeys={[currentRoute?.route ?? ""]}>
        {links.map(({ route, name, icon }) => (
          <Item key={route} icon={icon}>
            <Link to={route}>{name}</Link>
          </Item>
        ))}
      </AntMenu>
    </Sider>
  );
}

export default Menu;
