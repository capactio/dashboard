import { Card, Col, Descriptions, Input, List, Row, Tag, Tooltip } from "antd";
import "./InterfacesList.css";
import React, { useState } from "react";
import { CenteredSpinner, ErrorAlert } from "../layout";
import { SearchOutlined } from "@ant-design/icons";
import { TypeReference } from "../generated/graphql";
import { renderInterfaceActionsButtons } from "./render-interface-action-buttons";
import { InterfaceRevisionWithKey } from "./interface-revision";

const { Item } = List;

export interface InterfacesListProps {
  interfaces?: InterfaceRevisionWithKey[];
  error?: Error;
  isLoading: boolean;
  onInterfaceClick: (path: string, revision: string) => void;
}

export function InterfacesList({
  interfaces,
  error,
  isLoading,
  onInterfaceClick,
}: InterfacesListProps) {
  const [namePrefix, setNamePrefix] = useState("");

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const ifaces = interfaces?.filter(({ key }) => {
    return !(namePrefix && !key.includes(namePrefix));
  });

  const extraContent = (
    <Input
      placeholder="name"
      allowClear
      suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
      onChange={(e) => {
        if (namePrefix === e.target.value) {
          return;
        }
        setNamePrefix(e.target.value);
      }}
    />
  );

  return (
    <Card
      title="Interfaces"
      headStyle={{ borderBottom: "none" }}
      bordered={false}
      extra={extraContent}
    >
      <List
        itemLayout="horizontal"
        dataSource={ifaces}
        style={{ background: "#fff" }}
        renderItem={(rev) => {
          const inputParams = toCodeItemList(rev?.spec.input.parameters);
          const inputTIss = toCodeItemList(rev?.spec.input.typeInstances);
          const output = toCodeItemList(rev?.spec.output.typeInstances);
          const actions = renderInterfaceActionsButtons(rev, () =>
            onInterfaceClick(rev.metadata.path, rev.revision)
          );

          return (
            <Item className="list-item" actions={actions}>
              <Row>
                <Col span={10}>
                  <Item.Meta
                    title={rev?.metadata.displayName}
                    description={rev.key}
                  />
                </Col>
                <Col span={14}>
                  <Descriptions
                    labelStyle={{ fontWeight: 500 }}
                    size="small"
                    column={2}
                  >
                    <Descriptions.Item label="Input Parameters">
                      <div>{inputParams?.length ? inputParams : "None"}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Input TypeInstances">
                      <div>{inputTIss?.length ? inputTIss : "None"}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Outputs">
                      <div>{output?.length ? output : "None"}</div>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Item>
          );
        }}
      />
    </Card>
  );
}

interface NamedEntry {
  name: string;
  typeRef?: TypeReference | null;
}

function toCodeItemList(arg?: Array<NamedEntry | undefined | null>) {
  return arg
    ?.filter((v): v is NamedEntry => v !== undefined && v !== null)
    .map((v) => (
      <AddTypeRefTooltipIfPossible key={v.name} typeRef={v.typeRef}>
        <Tag color="blue" style={{ cursor: "default" }} key={v.name}>
          {v.name}
        </Tag>
      </AddTypeRefTooltipIfPossible>
    ));
}

interface AddTypeRefTooltipIfPossibleProps {
  children: React.ReactNode;
  typeRef?: TypeReference | null;
}

function AddTypeRefTooltipIfPossible({
  children,
  typeRef,
}: AddTypeRefTooltipIfPossibleProps) {
  if (!typeRef) {
    return <>{children}</>;
  }

  return (
    <Tooltip
      placement="top"
      overlayStyle={{ maxWidth: "420px" }}
      title={`${typeRef.path}:${typeRef.revision}`}
      arrowPointAtCenter
    >
      {children}
    </Tooltip>
  );
}
