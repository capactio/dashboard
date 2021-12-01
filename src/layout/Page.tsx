import React from "react";
import "./Page.css";

import { Breadcrumb, PageHeader } from "antd";

interface PageProps {
  children: React.ReactNode;
  title: string;
  breadcrumb: React.ReactElement<typeof Breadcrumb>;
}

function Page({ children, title, breadcrumb }: PageProps) {
  return (
    <>
      <PageHeader
        className="site-page-header"
        title={title}
        breadcrumb={breadcrumb}
      />
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 380 }}
      >
        {children}
      </div>
    </>
  );
}

export default Page;
