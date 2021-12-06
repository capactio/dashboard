import React from "react";
import { Button, Descriptions, List, Modal, Typography } from "antd";
import ErrorAlert from "../layout/ErrorAlert";
import CenteredSpinner from "../layout/CenteredSpinner";
import { TypeInstanceQuery } from "../generated/graphql";
import Paragraph from "antd/lib/typography/Paragraph";

import "./TypeInstanceDetails.css";

const { Text } = Typography;

export interface TypeInstanceDetailsProps {
  visible: boolean;
  data?: TypeInstanceQuery;
  isLoading: boolean;
  error?: Error;
  hideFn: () => void;
}

function TypeInstanceDetails({
  visible,
  hideFn,
  data,
  error,
  isLoading,
}: TypeInstanceDetailsProps) {
  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (isLoading) {
    return <CenteredSpinner />;
  }

  const typeInstance = data?.typeInstance;

  if (!typeInstance) {
    return <ErrorAlert error={new Error(`TypeInstance doesn't exist`)} />;
  }

  const typeInstanceRevision = typeInstance.latestResourceVersion;
  const attributes = typeInstanceRevision?.metadata.attributes ?? [];
  return (
    <Modal
      title="TypeInstance Details"
      visible={visible}
      width="700px"
      footer={[
        <Button key="back" onClick={hideFn}>
          Close
        </Button>,
      ]}
      onCancel={hideFn}
    >
      <Descriptions
        column={1}
        bordered
        layout="vertical"
        size="small"
        title="General"
      >
        <Descriptions.Item label="ID">{typeInstance.id}</Descriptions.Item>
        <Descriptions.Item label="Type reference">
          <Text code>
            {typeInstance?.typeRef.path}:{typeInstance?.typeRef.revision}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Locked by">
          {typeInstance.lockedBy ? (
            <Text code>{typeInstance.lockedBy}</Text>
          ) : (
            "TypeInstance is not locked"
          )}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        column={1}
        bordered
        layout="vertical"
        size="small"
        title="Latest TypeInstance Revision"
        style={{ marginTop: "24px" }}
      >
        <Descriptions.Item label="Resource Version">
          {typeInstanceRevision?.resourceVersion}
        </Descriptions.Item>
        <Descriptions.Item label="Created by">
          {typeInstanceRevision?.createdBy ? (
            <Text code>{typeInstanceRevision.createdBy}</Text>
          ) : (
            "User"
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Attributes">
          {attributes.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={attributes}
              renderItem={({
                path,
                revision,
              }: {
                path: string;
                revision: string;
              }) => {
                const title = `${path}:${revision}`;
                return (
                  <List.Item key={title}>
                    <List.Item.Meta title={<Text code>{title}</Text>} />
                  </List.Item>
                );
              }}
            />
          ) : (
            "No Attributes"
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Value">
          <Paragraph>
            <pre className="scrollable-ti">
              {JSON.stringify(typeInstanceRevision?.spec.value, null, 4)}
            </pre>
          </Paragraph>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}

export default TypeInstanceDetails;
