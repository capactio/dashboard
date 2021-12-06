import React from "react";
import { Breadcrumb, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ActionListContainer from "../actions/ActionList.container";
import Page from "../layout/Page";
import { PlusCircleOutlined } from "@ant-design/icons";

function Actions() {
  const breadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/actions">Actions</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );

  const navigate = useNavigate();

  return (
    <Page
      breadcrumb={breadcrumb}
      title="Actions"
      extra={
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => navigate("/actions/new")}
        >
          New Action
        </Button>
      }
    >
      <ActionListContainer />
    </Page>
  );
}

export default Actions;
