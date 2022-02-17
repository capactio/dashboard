import React from "react";
import { Breadcrumb } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { ActionListContainer } from "@capactio/react-components";
import Page from "../layout/Page";
import { loadRuntimeConfig } from "../config/runtime";

function Actions() {
  const navigate = useNavigate();

  const breadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/actions">Actions</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );

  const { queryRefetchIntervalMS } = loadRuntimeConfig();

  const onActionClick = (name: string) => {
    navigate(`/actions/${name}`);
  };

  return (
    <Page breadcrumb={breadcrumb} title="Created Actions">
      <ActionListContainer
        refetchInterval={queryRefetchIntervalMS}
        onActionClick={onActionClick}
      />
    </Page>
  );
}

export default Actions;
