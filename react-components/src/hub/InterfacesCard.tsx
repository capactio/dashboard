import { Card, Col, Row, Statistic } from "antd";
import React from "react";
import { renderInterfaceActionsButtons } from "./render-interface-action-buttons";
import { InterfaceRevisionWithKey } from "./interface-revision";
import { CenteredSpinner, ErrorAlert } from "../layout";
import "./InterfacesCard.css";

export interface InterfacesCardProps {
  interfaces?: InterfaceRevisionWithKey[];
  error?: Error;
  isLoading: boolean;
  onInterfaceClick: (path: string, revision: string) => void;
}

export function InterfacesCard({ interfaces, error, isLoading, onInterfaceClick }: InterfacesCardProps) {
  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const cards = interfaces?.map((rev) => {
    const inputParams = rev?.spec.input.parameters.length ?? "None";
    const inputTIss = rev?.spec.input.typeInstances.length ?? "None";
    const output = rev?.spec.output.typeInstances.length ?? "None";
    const actions = renderInterfaceActionsButtons(rev, () => onInterfaceClick(rev.metadata.path, rev.revision));

    return (
      <Col key={rev.key} span={6}>
        <Card hoverable actions={actions} bordered={false}>
          <Card.Meta
            className="interfaces-card"
            title={rev?.metadata.displayName}
            description={rev?.key}
          />
          <Row gutter={2}>
            <Col span={8}>
              <Statistic title="Input Parameters" value={inputParams} />
            </Col>
            <Col span={8}>
              <Statistic title="Input TypeInstances" value={inputTIss} />
            </Col>
            <Col span={8}>
              <Statistic title="Output TypeInstances" value={output} />
            </Col>
          </Row>
        </Card>
      </Col>
    );
  });
  return <Row gutter={[24, 24]}> {cards} </Row>;
}
