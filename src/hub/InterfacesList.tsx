import {
  Card,
  Col,
  Descriptions,
  Input,
  List,
  Row,
  Tooltip,
  Typography,
} from "antd";
import "./InterfacesList.css";
import React, { useState } from "react";
import CenteredSpinner from "../layout/CenteredSpinner";
import ErrorAlert from "../layout/ErrorAlert";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { InterfaceRevisionWithKey } from "./Interfaces.container";

const { Text } = Typography;
const { Search } = Input;
const { Item } = List;

interface InterfacesListProps {
  interfaces?: InterfaceRevisionWithKey[];
  error?: Error;
  isLoading: boolean;
}

function InterfacesList({ interfaces, error, isLoading }: InterfacesListProps) {
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
    <Search
      allowClear
      placeholder="name"
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

          return (
            <Item
              className="list-item"
              actions={[
                <Link
                  style={{ fontSize: 22 }}
                  to={`/actions/new/${rev?.metadata.path}/${rev?.revision}`}
                >
                  <Tooltip placement="topLeft" title="Create Action">
                    <RightOutlined />
                  </Tooltip>
                </Link>,
              ]}
            >
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

interface namedEntry {
  name: string;
}

function toCodeItemList(arg?: Array<namedEntry | undefined | null>) {
  return arg?.map((v) => {
    return (
      v && (
        <Text key={v.name} code>
          {v.name}
        </Text>
      )
    );
  });
}

export default InterfacesList;
