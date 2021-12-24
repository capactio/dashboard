import React from "react";
import { List, Typography } from "antd";

const { Text, Paragraph } = Typography;

interface InputParametersProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: { [key: string]: any };
}

function InputParameters({ data }: InputParametersProps) {
  if (!data) {
    return <Text key="empty">No input parameters</Text>;
  }

  const dataSource = Object.keys(data).map((key) => ({
    name: key,
    value: JSON.parse(data[key]),
  }));

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

export default InputParameters;
