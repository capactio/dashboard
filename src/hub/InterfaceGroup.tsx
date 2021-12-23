import { Avatar, Badge, Card, Col, Row, Skeleton, Typography } from "antd";
import React from "react";
import { InterfaceGroup as InterfaceGroupGQL } from "../generated/graphql";
import ErrorAlert from "../layout/ErrorAlert";
import { useNavigate } from "react-router-dom";
import "./InterfaceGroup.css";

const { Paragraph } = Typography;

interface InterfaceGroupProps {
  interfaceGroups: InterfaceGroupGQL[];
  error?: Error;
  isLoading: boolean;
}

function InterfaceGroup({
  interfaceGroups,
  error,
  isLoading,
}: InterfaceGroupProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return loadingCards();
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const cards = interfaceGroups.map(({ metadata, interfaces }) => {
    const ifaceCnt = interfaces.length;
    return (
      <Col span={6}>
        <Badge.Ribbon text={ifaceCnt}>
          <Card
            hoverable={ifaceCnt > 0}
            onClick={() => {
              ifaceCnt && navigate(`/hub/interface-groups/${metadata.path}`);
            }}
            bordered={false}
          >
            <Card.Meta
              avatar={
                <Avatar shape="square" size="large" src={metadata.iconURL} />
              }
              title={metadata.displayName}
              description={
                <Paragraph ellipsis={{ rows: 1 }}>{metadata.path}</Paragraph>
              }
            />
          </Card>
        </Badge.Ribbon>
      </Col>
    );
  });

  return <Row gutter={[24, 24]}> {cards} </Row>;
}

function loadingCards() {
  const skeletons = Array(3).fill(
    <Col span={6}>
      <Card bordered={false}>
        <Skeleton
          active
          loading
          avatar={{ shape: "square" }}
          title
          paragraph={{ rows: 1 }}
        />
      </Card>
    </Col>
  );
  return <Row gutter={[24, 24]}>{skeletons}</Row>;
}

export default InterfaceGroup;
