import React from "react";

import { Button, Descriptions, Layout, Tooltip, Typography } from "antd";
import ActionStatus from "./ActionStatus";
import "./Action.css";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ActionQuery } from "../generated/graphql";
import CenteredSpinner from "../layout/CenteredSpinner";
import ErrorAlert from "../layout/ErrorAlert";

import ActionTabs from "./ActionTabs";

const { Content } = Layout;
const { Text } = Typography;

interface ActionProps {
  data?: ActionQuery;
  isLoading: boolean;
  error?: Error;
  runAction: () => void;
  isRunActionLoading: boolean;
  canBeRun: boolean;
  hasBeenRun: boolean;
  argoWorkflowLink?: string;
  showTypeInstanceDetails: (typeInstanceID: string) => void;
}

function Action({
  data,
  isLoading,
  error,
  runAction,
  isRunActionLoading,
  canBeRun,
  hasBeenRun,
  argoWorkflowLink,
  showTypeInstanceDetails,
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

  const runActionBtn = (
    <Button
      type="primary"
      onClick={() => runAction()}
      disabled={!canBeRun}
      loading={isRunActionLoading}
      icon={hasBeenRun ? <CheckCircleOutlined /> : null}
    >
      Run Action
    </Button>
  );

  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      <Descriptions column={1} bordered title="General" extra={runActionBtn}>
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
        showTypeInstanceDetails={showTypeInstanceDetails}
        hasBeenRun={hasBeenRun}
        argoWorkflowLink={argoWorkflowLink}
      />
    </Content>
  );
}

export default Action;
