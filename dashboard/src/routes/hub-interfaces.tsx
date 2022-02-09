import { Breadcrumb } from "antd";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InterfacesContainer, {
  InterfacesView,
} from "../hub/Interfaces.container";
import Page from "../layout/Page";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

const activeStyle = { fontSize: 22 };
const inactiveStyle = { ...activeStyle, color: "rgba(0, 0, 0, 0.2)" };

function NewInterfacesCatalog() {
  const [view, setView] = useState<InterfacesView>(InterfacesView.List);
  const { name } = useParams();
  const navigate = useNavigate();
  if (!name) {
    return <p>InterfaceGroup name cannot be empty</p>;
  }

  const breadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item>Hub</Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to="/hub/interface-groups">InterfaceGroups</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{name}</Breadcrumb.Item>
    </Breadcrumb>
  );
  return (
    <Page
      breadcrumb={breadcrumb}
      extra={[
        <BarsOutlined
          key="1"
          style={view === InterfacesView.List ? activeStyle : inactiveStyle}
          onClick={() => setView(InterfacesView.List)}
        />,
        <AppstoreOutlined
          key="2"
          style={view === InterfacesView.Card ? activeStyle : inactiveStyle}
          onClick={() => setView(InterfacesView.Card)}
        />,
      ]}
      title="Public Hub"
      onBack={() => navigate("/hub/interface-groups")}
    >
      <InterfacesContainer path={name} view={view} />
    </Page>
  );
}

export default NewInterfacesCatalog;
