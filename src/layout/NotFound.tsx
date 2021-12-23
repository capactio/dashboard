import React from "react";
import "./Page.css";
import { Result } from "antd";
import Page from "./Page";

function NotFoundPage() {
  return (
    <Page>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist or it's under construction."
      />
    </Page>
  );
}

export default NotFoundPage;
