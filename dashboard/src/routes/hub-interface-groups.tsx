import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InterfaceGroupCardsContainer } from "@capactio/react-components";
import Page from "../layout/Page";

function InterfaceGroupCatalog() {
  const navigate = useNavigate();
  const onInterfaceGroupClick = (interfaceGroupPath: string) => {
    navigate(`/hub/interface-groups/${interfaceGroupPath}`)
  }

  const breadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item>Hub</Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to="/hub/interface-groups">InterfaceGroups</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
  return (
    <Page breadcrumb={breadcrumb} title="Public Hub">
      <InterfaceGroupCardsContainer onInterfaceGroupClick={onInterfaceGroupClick} />
    </Page>
  );
}

export default InterfaceGroupCatalog;
