import { Avatar, Badge, Card, Col, Row, Skeleton, Typography } from "antd";
import React from "react";
import { InterfaceGroup as InterfaceGroupGQL } from "../generated/graphql";
import { ErrorAlert } from "../layout";

import "./InterfaceGroup.css";

const { Paragraph } = Typography;

// defines number of skeletons Cards to display while loading
const skeletonsTabsNumber = 15;

export interface InterfaceGroupCardsProps {
  interfaceGroups: InterfaceGroupGQL[];
  error?: Error;
  isLoading: boolean;
  onInterfaceGroupClick: (interfaceGroupPath: string) => void;
}

export function InterfaceGroupCards({
  interfaceGroups,
  error,
  isLoading,
  onInterfaceGroupClick,
}: InterfaceGroupCardsProps) {
  if (isLoading) {
    return LoadingCards();
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const cards = interfaceGroups.map(({ metadata, interfaces }) => {
    const ifaceCnt = interfaces.length;
    return (
      <Col span={6} key={metadata.path}>
        <Card
          className="content-bg-rounded"
          hoverable={ifaceCnt > 0}
          onClick={() => {
            ifaceCnt && onInterfaceGroupClick(metadata.path);
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
          <div className="interface-group-count-wrapper">
            <Badge className="interface-group-count" count={ifaceCnt} />
          </div>
        </Card>
      </Col>
    );
  });

  return <Row gutter={[24, 24]}> {cards} </Row>;
}

function LoadingCards() {
  const skeletons = Array(skeletonsTabsNumber)
    .fill(null)
    .map((_, idx) => (
      <Col span={6} key={idx}>
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
    ));
  return <Row gutter={[24, 24]}>{skeletons}</Row>;
}
