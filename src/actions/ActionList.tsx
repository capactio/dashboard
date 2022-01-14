import React from "react";
import { ActionStatusPhase } from "../generated/graphql";
import { Table, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ActionStatus from "./ActionStatus";
import ErrorAlert from "../layout/ErrorAlert";

const { Text } = Typography;

export interface ActionItem {
  key: string;
  name: string;
  actionRef: string;
  createdAt: string;
  status?: ActionStatusPhase;
}

interface ActionListProps {
  isLoading: boolean;
  error?: Error;
  data?: ActionItem[];
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: string) => (
      <Link to={`/actions/${name}`}>
        <strong>{name}</strong>
      </Link>
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
      <ActionStatus phase={phase} />
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
      <Link to={`/actions/${name}`}>
        <EyeOutlined />
      </Link>
    ),
  },
];

function ActionList({ data, isLoading, error }: ActionListProps) {
  if (error) {
    return <ErrorAlert error={error} />;
  }

  const dataSource = data ?? [];

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

export default ActionList;
