import { Button, Descriptions, Spin, Tabs, Tooltip, Typography } from "antd";
import React from "react";
import { ActionInputParameters } from "./ActionInputParameters";
import { ActionQuery, ActionStatusPhase } from "../generated/graphql";
import { ProfileOutlined } from "@ant-design/icons";
import { ErrorAlert } from "../layout";
import { TypeInstancesListContainer } from "../typeinstances/TypeInstancesList.container";

const { TabPane } = Tabs;
const { Text, Paragraph } = Typography;

export interface ActionTabsProps {
  data: ActionQuery;
  hasBeenRun: boolean;
  argoWorkflowLink?: string;
}

export function ActionTabs({
  data,
  hasBeenRun,
  argoWorkflowLink,
}: ActionTabsProps) {
  if (!data.action) {
    return <ErrorAlert errorMessage="Action cannot be undefined" />;
  }

  const action = data.action;
  const renderedAction = {
    args: action.renderedAction?.args ?? {},
    runnerInterface: action.renderedAction?.runnerInterface ?? "unknown",
  };

  const outputTabDisabled =
    action.status?.phase !== ActionStatusPhase.Succeeded;
  const hideTabs =
    action.status?.phase === ActionStatusPhase.Initial ||
    action.status?.phase === ActionStatusPhase.BeingRendered;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputParamsSource = (parameters: any) => {
    if (!parameters) {
      return undefined;
    }

    return Object.keys(parameters).map((key) => {
      return {
        name: key,
        value: JSON.parse(parameters[key]),
      };
    });
  };

  return (
    <Spin
      spinning={hideTabs}
      tip="Waiting for rendering completion to show additional Action details..."
    >
      <Tabs defaultActiveKey="1" style={{ marginTop: "24px" }}>
        <TabPane tab="Inputs" key="1">
          <Descriptions
            column={1}
            layout="vertical"
            bordered
            style={{ marginTop: "24px" }}
          >
            <Descriptions.Item label="Input Parameters">
              <ActionInputParameters
                dataSource={inputParamsSource(action.input?.parameters)}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Input TypeInstances">
              <TypeInstancesListContainer data={action.input?.typeInstances} />
            </Descriptions.Item>
            <Descriptions.Item label="Action Policy">
              {action.input?.actionPolicy ? (
                <Paragraph>
                  <pre className="scrollable">
                    {JSON.stringify(action.input?.actionPolicy, null, 4)}
                  </pre>
                </Paragraph>
              ) : (
                <Text>No Action Policy</Text>
              )}
            </Descriptions.Item>
          </Descriptions>
        </TabPane>

        <TabPane tab="Workflow" key="2">
          <Descriptions
            column={1}
            layout="vertical"
            bordered
            style={{ marginTop: "24px" }}
            extra={
              <Tooltip
                placement="top"
                title={!hasBeenRun && "Workflow has to be started first"}
              >
                <Button
                  type="default"
                  disabled={!argoWorkflowLink}
                  icon={<ProfileOutlined />}
                  href={argoWorkflowLink}
                  target="_blank"
                >
                  See workflow in Argo UI
                </Button>
              </Tooltip>
            }
          >
            <Descriptions.Item label="Runner Interface">
              <Text code>{renderedAction.runnerInterface}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Runner Arguments">
              <Paragraph>
                <pre className="scrollable">
                  {JSON.stringify(renderedAction.args, null, 4)}
                </pre>
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Runner status">
              {action.status?.runner?.status ? (
                <Paragraph>
                  <pre className="scrollable">
                    {JSON.stringify(action.status?.runner?.status, null, 4)}
                  </pre>
                </Paragraph>
              ) : (
                <Text>No reported status from Runner</Text>
              )}
            </Descriptions.Item>
          </Descriptions>
        </TabPane>

        <TabPane disabled={outputTabDisabled} tab="Outputs" key="3">
          <Descriptions
            column={1}
            layout="vertical"
            bordered
            style={{ marginTop: "24px" }}
          >
            <Descriptions.Item label="TypeInstances">
              <TypeInstancesListContainer data={action.output?.typeInstances} />
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
      </Tabs>
    </Spin>
  );
}
