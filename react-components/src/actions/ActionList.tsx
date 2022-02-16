import React from "react";
import { ActionStatusPhase } from "../generated/graphql";
import { Button, Table, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { ActionStatusBadge } from "./ActionStatusBadge";
import { ErrorAlert } from "../layout";

const { Text } = Typography;

export interface ActionItem {
  key: string;
  name: string;
  actionRef: string;
  createdAt: string;
  status?: ActionStatusPhase;
}

export interface ActionListProps {
  isLoading: boolean;
  error?: Error;
  data?: ActionItem[];
  onActionClick: (name: string) => void;
}

export function ActionList({ data, isLoading, error, onActionClick }: ActionListProps) {
  if (error) {
    return <ErrorAlert error={error} />;
  }

  const dataSource = data ?? [];
  const columns = createColumns(onActionClick)

  return (
    <Table
      className="content-bg-rounded"
      loading={isLoading}
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  );
}


function createColumns(onActionClick: (name: string) => void) {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <Button type="link" onClick={() => onActionClick(name)}><strong>{name}</strong></Button>
      ),
      sorter: (a: ActionItem, b: ActionItem) => a.name.localeCompare(b.name),
    },
    {
      title: "Interface",
      dataIndex: "actionRef",
      key: "actionRef",
      render: (actionRef: string) => <Text code>{actionRef}</Text>,
      sorter: (a: ActionItem, b: ActionItem) =>
        a.actionRef.localeCompare(b.actionRef),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => <Text>{new Date(date).toUTCString()}</Text>,
      sorter: (a: ActionItem, b: ActionItem) =>
        new Date(a.createdAt as string).getTime() -
        new Date(b.createdAt as string).getTime(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (phase: ActionStatusPhase | undefined) => (
        <ActionStatusBadge phase={phase} />
      ),
      sorter: (a: ActionItem, b: ActionItem) => {
        const { status: aStatus = "" } = a;
        const { status: bStatus = "" } = b;

        return aStatus.localeCompare(bStatus);
      },
    },
    {
      title: "Action",
      dataIndex: "name",
      align: "center" as const,
      key: "action",
      render: (name: string) => (
        <Button type="link" onClick={() => onActionClick(name)}><EyeOutlined /></Button>
      ),
    },
  ]
}