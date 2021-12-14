import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import Page from "../layout/Page";
import WizardContainer from "../wizard/Wizard.container";

function NewAction() {
  const breadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/actions">Actions</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>New</Breadcrumb.Item>
    </Breadcrumb>
  );

  return (
    <Page breadcrumb={breadcrumb} title="Create a new Action">
      <WizardContainer />
    </Page>
  );
}

export default NewAction;
