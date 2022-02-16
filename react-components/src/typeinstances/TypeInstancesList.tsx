import React from "react";
import { Button, List, Typography } from "antd";
import { GenericTypeInstanceData } from "./TypeInstancesList.container";

const { Text } = Typography;

export interface TypeInstancesListProps {
  data?: GenericTypeInstanceData[];
  showTypeInstanceDetails: (typeInstanceID: string) => void;
}

export function TypeInstancesList({
  data = [],
  showTypeInstanceDetails,
}: TypeInstancesListProps) {
  if (!data?.length) {
    return <Text>No TypeInstances</Text>;
  }

  const linkToDetails = (id: string, label: string) => (
    <Button
      type="link"
      className="link-btn"
      onClick={() => showTypeInstanceDetails(id)}
    >
      {label}
    </Button>
  );

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(ti: GenericTypeInstanceData) => {
        const idComponent = (
          <>
            <Text strong>ID: </Text>
            {linkToDetails(ti.id, ti.id)}
          </>
        );

        const itemKey = `${ti.name || ""}-${ti.id}`;

        return (
          <List.Item
            key={itemKey}
            actions={[linkToDetails(ti.id, "See details")]}
          >
            <List.Item.Meta
              title={idComponent}
              description={
                <>
                  {ti.typeRef && (
                    <>
                      <Text strong>Type Reference: </Text>
                      <Text
                        code
                      >{`${ti.typeRef.path}:${ti.typeRef.revision}`}</Text>
                    </>
                  )}
                  {ti.name && (
                    <>
                      <Text strong>Name: </Text>
                      <Text code>{ti.name}</Text>
                    </>
                  )}
                </>
              }
            />
          </List.Item>
        );
      }}
    />
  );
}
