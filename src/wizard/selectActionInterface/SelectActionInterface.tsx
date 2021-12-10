import { Col, Radio, Tabs } from "antd";
import React from "react";
import {
  InterfaceRevision,
  ListInterfaceGroupsQuery,
} from "../../generated/graphql";
import CenteredSpinner from "../../layout/CenteredSpinner";
import ErrorAlert from "../../layout/ErrorAlert";

const { TabPane } = Tabs;

interface SelectActionInterfaceProps {
  data?: ListInterfaceGroupsQuery;
  error?: Error;
  isLoading: boolean;
  setValue: (actionInterface?: InterfaceRevision) => void;
  currentValue?: InterfaceRevision;
}

function SelectActionInterface({
  data,
  error,
  isLoading,
  currentValue,
  setValue,
}: SelectActionInterfaceProps) {
  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const groups = data?.interfaceGroups ?? [];
  const tabs = groups.map(({ metadata, interfaces }) => {
    const ifaces = interfaces.map(({ latestRevision }) => {
      const rev = latestRevision as InterfaceRevision;
      return (
        <Radio.Button
          style={{ margin: 5 }}
          className="huge-radio"
          key={getKey(rev)}
          value={getKey(rev)}
          onClick={() => setValue(rev)}
        >
          <strong>{rev?.metadata.displayName}</strong>
          <p>{rev?.metadata.path}</p>
        </Radio.Button>
      );
    });
    return (
      <TabPane tab={metadata.displayName} key={metadata.path}>
        <Col span={24} className="huge-radio-group">
          <Radio.Group
            size="large"
            buttonStyle="solid"
            value={getKey(currentValue)}
          >
            {ifaces}
          </Radio.Group>
        </Col>
      </TabPane>
    );
  });

  const defaultActiveKey = groups.find(({ interfaces }) => {
    const ifaces = interfaces.filter(({ latestRevision }) => {
      return currentValue === latestRevision;
    });
    return ifaces.length === 1;
  });

  return (
    <Tabs
      defaultActiveKey={defaultActiveKey?.metadata.path}
      tabPosition="left"
      style={{ height: 550 }}
      onChange={() => setValue(undefined)}
    >
      {tabs}
    </Tabs>
  );
}

function getKey(ifaceRev?: InterfaceRevision): string {
  return `${ifaceRev?.metadata.path}:${ifaceRev?.revision}`;
}

export default SelectActionInterface;
