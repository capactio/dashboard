import { Card, Col, Row, Statistic } from "antd";
import React from "react";
import CenteredSpinner from "../layout/CenteredSpinner";
import ErrorAlert from "../layout/ErrorAlert";
import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { InterfaceRevisionWithKey } from "./Interfaces.container";

interface SelectActionInterfaceProps {
  interfaces?: InterfaceRevisionWithKey[];
  error?: Error;
  isLoading: boolean;
}

function InterfacesCard({
  interfaces,
  error,
  isLoading,
}: SelectActionInterfaceProps) {
  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const cardActions = (rev: InterfaceRevisionWithKey) => {
    const btns = [
      <Link to={`/actions/new/${rev?.metadata.path}/${rev?.revision}`}>
        <PlusCircleOutlined /> Create
      </Link>,
    ];
    if (rev?.metadata.documentationURL) {
      btns.unshift(
        <a
          href={rev.metadata.documentationURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InfoCircleOutlined /> Action Doc
        </a>
      );
    }
    return btns;
  };
  const cards = interfaces?.map((rev) => {
    const inputParams = rev?.spec.input.parameters.length ?? "None";
    const inputTIss = rev?.spec.input.typeInstances.length ?? "None";
    const output = rev?.spec.output.typeInstances.length ?? "None";

    return (
      <>
        <Col span={24 / 6}>
          <Card
            key={rev.key}
            hoverable
            actions={cardActions(rev)}
            bordered={false}
          >
            <Card.Meta
              title={rev?.metadata.displayName}
              description={
                <>
                  <Row gutter={2}>
                    <Col span={12}>
                      <Statistic title="Input Parameters" value={inputParams} />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Input TypeInstances"
                        value={inputTIss}
                      />
                    </Col>
                    <Col span={24}>
                      <Statistic title="Output TypeInstances" value={output} />
                    </Col>
                  </Row>
                </>
              }
            />
          </Card>
        </Col>
      </>
    );
  });
  return <Row gutter={[24, 24]}> {cards} </Row>;
}

export default InterfacesCard;
