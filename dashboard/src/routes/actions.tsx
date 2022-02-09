import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import ActionListContainer from "../actions/ActionList.container";
import Page from "../layout/Page";

function Actions() {
  const breadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/actions">Actions</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );

  return (
    <Page breadcrumb={breadcrumb} title="Created Actions">
      <ActionListContainer />
    </Page>
  );
}

export default Actions;
