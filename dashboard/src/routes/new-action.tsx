import React from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import Page from "../layout/Page";
import WizardContainer from "../wizard/Wizard.container";

function NewAction() {
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

  return (
    <Page
      breadcrumb={breadcrumb}
      title="Create a new Action"
      onBack={() => window.history.back()}
    >
      <WizardContainer interfacePath={path} interfaceRevision={revision} />
    </Page>
  );
}

export default NewAction;
