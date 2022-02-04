import { Breadcrumb } from "antd";
import React from "react";
import InterfaceGroupsContainer from "../hub/InterfaceGroups.container";
import Page from "../layout/Page";
import { Link } from "react-router-dom";

function NewInterfaceGroupCatalog() {
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
      <InterfaceGroupsContainer />
    </Page>
  );
}

export default NewInterfaceGroupCatalog;
