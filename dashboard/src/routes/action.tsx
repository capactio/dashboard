import React from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { ActionDetailsContainer } from "@capactio/react-components";
import Page from "../layout/Page";
import { loadRuntimeConfig } from "../config/runtime";

function Action() {
  const navigate = useNavigate();
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

  const { queryRefetchIntervalMS, argoWorkflowsUIBaseURL } = loadRuntimeConfig();

  const onDeleteAction = (_: string) => {
    navigate("/actions");
  }

  return (
    <Page breadcrumb={breadcrumb} title="Action details">
      <ActionDetailsContainer
        name={actionName}
        refetchInterval={queryRefetchIntervalMS}
        argoWorkflowsUIBaseURL={argoWorkflowsUIBaseURL}
        onDeleteAction={onDeleteAction}
      />
    </Page>
  );
}

export default Action;
