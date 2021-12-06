import { Button, Descriptions, Spin, Tabs, Tooltip, Typography } from "antd";
import React from "react";
import InputParameters from "./ActionInputParameters";
import TypeInstancesList from "./ActionTypeInstancesList";
import { ActionQuery, ActionStatusPhase } from "../generated/graphql";
import { ProfileOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Text, Paragraph } = Typography;

interface ActionTabsProps {
  data: ActionQuery;
  showTypeInstanceDetails: (typeInstanceID: string) => void;
  hasBeenRun: boolean;
  argoWorkflowLink?: string;
}

function ActionTabs({
  data,
  showTypeInstanceDetails,
  hasBeenRun,
  argoWorkflowLink,
}: ActionTabsProps) {
  const action = data.action!;
  const renderedAction = {
    args: action.renderedAction?.args ?? {},
    runnerInterface: action.renderedAction?.runnerInterface ?? "unknown",
  };

  const outputTabDisabled =
    action.status?.phase !== ActionStatusPhase.Succeeded;
  const hideTabs =
    action.status?.phase === ActionStatusPhase.Initial ||
    action.status?.phase === ActionStatusPhase.BeingRendered;

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
            title="Inputs"
            style={{ marginTop: "24px" }}
          >
            <Descriptions.Item label="Input Parameters">
              <InputParameters data={action.input?.parameters} />
            </Descriptions.Item>
            <Descriptions.Item label="Input TypeInstances">
              <TypeInstancesList
                data={action.input?.typeInstances}
                showTypeInstanceDetails={showTypeInstanceDetails}
              />
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
            title="Workflow"
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
            title="Outputs"
            style={{ marginTop: "24px" }}
          >
            <Descriptions.Item label="TypeInstances">
              <TypeInstancesList
                data={action.output?.typeInstances}
                showTypeInstanceDetails={showTypeInstanceDetails}
              />
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
      </Tabs>
    </Spin>
  );
}

export default ActionTabs;
