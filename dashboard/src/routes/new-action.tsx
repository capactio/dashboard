import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { WizardContainer } from "@capactio/react-components";
import Page from "../layout/Page";

function NewAction() {
  const navigate = useNavigate();
  const { path, revision } = useParams();

  if (!path) {
    return <p>Interface path for Action cannot be empty</p>;
  }
  if (!revision) {
    return <p>Interface revision for Action cannot be empty</p>;
  }

  const breadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/actions">Actions</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>New</Breadcrumb.Item>
    </Breadcrumb>
  );

  const onActionCreate = (name: string) => {
    navigate(`/actions/${name}`);
  };

  return (
    <Page
      breadcrumb={breadcrumb}
      title="Create a new Action"
      onBack={() => window.history.back()}
    >
      <WizardContainer
        interfacePath={path}
        interfaceRevision={revision}
        onActionCreate={onActionCreate}
      />
    </Page>
  );
}

export default NewAction;
