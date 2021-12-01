import React from "react";

import { ActionStatusPhase, useActionListQuery } from "../generated/graphql";

import { Table, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ActionStatus from "./ActionStatus";

const { Text } = Typography;

interface ActionListProps {
  isLoading: boolean;
  error: Error | undefined;
  data:
    | {
        key: string;
        name: string;
        actionRef: string;
        createdAt: any;
        status: ActionStatusPhase | undefined;
      }[]
    | undefined
    | null;
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: any) => (
      <Link to={`/actions/${name}`}>
        <strong>{name}</strong>
      </Link>
    ),
    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
  },
  {
    title: "Interface",
    dataIndex: "actionRef",
    key: "actionRef",
    render: (actionRef: any) => <Text code>{actionRef}</Text>,
    sorter: (a: any, b: any) => a.actionRef.localeCompare(b.actionRef),
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: any) => <Text>{new Date(date).toUTCString()}</Text>,
    sorter: (a: any, b: any) =>
      new Date(a.createdAt as string).getTime() -
      new Date(b.createdAt as string).getTime(),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (phase: any) => <ActionStatus phase={phase} />,
  },
  {
    title: "Action",
    dataIndex: "name",
    align: "center" as const,
    key: "action",
    render: (name: any) => (
      <Link to={`/actions/${name}`}>
        <EyeOutlined />
      </Link>
    ),
  },
];

function ActionList({ data, isLoading, error }: ActionListProps) {
  if (error) {
    return <p>{error as Error}</p>;
  }

  const dataSource = data ?? [];

  return (
    <Table
      loading={isLoading}
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  );
}

export default ActionList;
