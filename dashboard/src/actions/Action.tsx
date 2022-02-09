import React from "react";

import {
  Button,
  Descriptions,
  Layout,
  Popconfirm,
  Space,
  Tooltip,
  Typography,
} from "antd";
import ActionStatus from "./ActionStatus";
import "./Action.css";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import { ActionQuery } from "../generated/graphql";
import CenteredSpinner from "../layout/CenteredSpinner";
import { ErrorAlert } from "@capactio/react-components";

import ActionTabs from "./ActionTabs";

const { Content } = Layout;
const { Text } = Typography;

interface ActionProps {
  data?: ActionQuery;
  isLoading: boolean;
  error?: Error;
  runAction: () => void;
  isRunActionLoading: boolean;
  deleteAction: () => void;
  isDeleteActionLoading: boolean;
  canBeRun: boolean;
  canBeDeleted: boolean;
  hasBeenRun: boolean;
  argoWorkflowLink?: string;
}

function Action({
  data,
  isLoading,
  error,
  runAction,
  isRunActionLoading,
  deleteAction,
  isDeleteActionLoading,
  canBeRun,
  canBeDeleted,
  hasBeenRun,
  argoWorkflowLink,
}: ActionProps) {
  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (isLoading) {
    return <CenteredSpinner />;
  }

  const action = data?.action;

  if (!action) {
    return <ErrorAlert errorMessage={`Action doesn't exist`} />;
  }

  const deleteButton = (
    <Button
      type="default"
      danger
      loading={isDeleteActionLoading}
      icon={<DeleteOutlined />}
      disabled={!canBeDeleted}
    >
      Delete
    </Button>
  );

  const extraButtons = (
    <Space size="middle">
      <Button
        type="primary"
        onClick={() => runAction()}
        disabled={!canBeRun}
        loading={isRunActionLoading}
        icon={hasBeenRun ? <CheckCircleOutlined /> : <PlaySquareOutlined />}
      >
        Run
      </Button>
      <Popconfirm
        title="Are you sure to delete this Action?"
        onConfirm={() => deleteAction()}
        okText="Yes"
        cancelText="No"
        placement="left"
        disabled={!canBeDeleted}
      >
        {canBeDeleted ? (
          deleteButton
        ) : (
          <Tooltip
            placement="rightTop"
            title={"Deleting running Action is not allowed"}
          >
            {deleteButton}
          </Tooltip>
        )}
      </Popconfirm>
    </Space>
  );

  return (
    <Content className="content-bg-rounded" style={{ padding: 24 }}>
      <Descriptions column={1} bordered title="General" extra={extraButtons}>
        <Descriptions.Item label="Name">{action?.name}</Descriptions.Item>
        <Descriptions.Item label="Created at">
          <Text>{new Date(action?.createdAt).toUTCString()}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Interface">
          <Text code>
            {action?.actionRef.path}:{action?.actionRef.revision}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <ActionStatus phase={action.status?.phase} />
        </Descriptions.Item>
        <Descriptions.Item label="Message">
          <Text>
            {action.status?.message} &nbsp;
            <Tooltip
              placement="rightTop"
              title={new Date(action.status?.timestamp).toUTCString()}
            >
              <InfoCircleOutlined style={{ cursor: "pointer" }} />
            </Tooltip>
          </Text>
        </Descriptions.Item>
      </Descriptions>

      <ActionTabs
        data={data}
        hasBeenRun={hasBeenRun}
        argoWorkflowLink={argoWorkflowLink}
      />
    </Content>
  );
}

export default Action;
