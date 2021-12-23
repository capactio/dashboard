import { Avatar, Badge, Card, Col, Row, Typography } from "antd";
import React from "react";
import { ListInterfaceGroupsOnlyQuery } from "../generated/graphql";
import CenteredSpinner from "../layout/CenteredSpinner";
import ErrorAlert from "../layout/ErrorAlert";
import { useNavigate } from "react-router-dom";

const { Paragraph } = Typography;

interface SelectActionInterfaceProps {
  data?: ListInterfaceGroupsOnlyQuery;
  error?: Error;
  isLoading: boolean;
}

function InterfaceGroup({
  data,
  error,
  isLoading,
}: SelectActionInterfaceProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }
  const groups = data?.interfaceGroups ?? [];
  const cards = groups.map(({ metadata, interfaces }) => {
    const ifaceCnt = interfaces.length;
    return (
      <Col span={6}>
        <Badge.Ribbon text={ifaceCnt}>
          <Card
            hoverable={ifaceCnt > 0}
            onClick={() => {
              if (!ifaceCnt) {
                return;
              }
              navigate(`/hub/interface-groups/${metadata.path}`);
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

export default InterfaceGroup;
