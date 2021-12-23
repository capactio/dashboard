import React from "react";
import "./Page.css";
import { Breadcrumb, Layout, PageHeader } from "antd";
import Footer from "./Footer";

interface PageProps {
  children: React.ReactNode;
  title?: string;
  breadcrumb?: React.ReactElement<typeof Breadcrumb>;
  onBack?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  extra?: React.ReactNode;
}

const { Content } = Layout;

function Page({ children, title, breadcrumb, extra, onBack }: PageProps) {
  const renderHeader = title || breadcrumb || extra || onBack;
  return (
    <Layout className="site-layout">
      {renderHeader && (
        <PageHeader
          breadcrumb={breadcrumb}
          className="page-header"
          onBack={onBack}
          title={title}
          extra={extra}
        />
      )}

      <Content style={{ margin: "16px", padding: 24, minHeight: "100vh" }}>
        {children}
      </Content>
      <Footer />
    </Layout>
  );
}

export default Page;
