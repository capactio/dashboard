import { Col, Radio, Tabs } from "antd";
import React from "react";
import {
  InterfaceRevision,
  ListInterfaceGroupsQuery,
} from "../../generated/graphql";
import CenteredSpinner from "../../layout/CenteredSpinner";
import ErrorAlert from "../../layout/ErrorAlert";
import { ResourceReference } from "../ResourceRef";

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
      const key = new ResourceReference(rev.metadata.path, rev.revision).key();

      return (
        <Radio.Button
          className="huge-radio"
          key={key}
          value={key}
          onClick={() => setValue(rev)}
        >
          <strong>{rev?.metadata.displayName}</strong>
          <p>{rev?.metadata.path}</p>
        </Radio.Button>
      );
    });

    const currentKey = new ResourceReference(
      currentValue?.metadata.path,
      currentValue?.revision
    ).key();
    return (
      <TabPane tab={metadata.displayName} key={metadata.path}>
        <Col span={24} className="huge-radio-group">
          <Radio.Group size="large" buttonStyle="solid" value={currentKey}>
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

export default SelectActionInterface;
