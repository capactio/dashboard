import React from "react";
import { List, Typography } from "antd";

const { Text, Paragraph } = Typography;

export interface ActionInputParamsSource {
  name: string;
  value: string;
}

export interface ActionInputParametersProps {
  dataSource?: ActionInputParamsSource[];
}

export function ActionInputParameters({
  dataSource,
}: ActionInputParametersProps) {
  if (!dataSource) {
    return <Text key="empty">No input parameters</Text>;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={(item) => {
        return (
          <List.Item key={item.name}>
            <List.Item.Meta
              title={
                <>
                  <Text strong>Name: </Text>
                  <Text code>{item.name}</Text>
                </>
              }
              description={
                <>
                  <Text strong>Value:</Text>
                  <Paragraph>
                    <pre className="scrollable">
                      {JSON.stringify(item.value, null, 4)}
                    </pre>
                  </Paragraph>
                </>
              }
            />
          </List.Item>
        );
      }}
    />
  );
}
