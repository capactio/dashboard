import React from "react";
import Page from "../layout/Page";

import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import ActionContainer from "../actions/Action.container";

function Action() {
  const { name } = useParams();

  const actionName = name ?? "";
  if (actionName === "") {
    return <p>Action name cannot be empty</p>;
  }

  const breadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/actions">Actions</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{actionName}</Breadcrumb.Item>
    </Breadcrumb>
  );

  return (
    <Page breadcrumb={breadcrumb} title="Action details">
      <ActionContainer name={actionName} />
    </Page>
  );
}

export default Action;
