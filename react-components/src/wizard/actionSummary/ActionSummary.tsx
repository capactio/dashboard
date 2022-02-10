import React, { useState } from "react";
import "./SelectActionImpl.css";
import { ErrorAlert } from "../../layout";
import { Button, Descriptions, Input, Layout, Tabs, Typography } from "antd";
import { ActionInputParameters } from "../../actions/ActionInputParameters";
import "./ActionSummary.css";
import { SelectActionImplContainer } from "./SelectActionImpl.container";
import { ResourceReference } from "../ResourceRef";
import {
  ActionSummaryInput,
  AdvancedModeInput,
} from "./ActionSummary.container";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import {
  TypeInstancesListContainer,
  GenericTypeInstanceData,
} from "../../typeinstances/TypeInstancesList.container";

const { Content } = Layout;
const { Text, Paragraph } = Typography;
const { TabPane } = Tabs;

export interface ActionSummaryProps {
  data: ActionSummaryInput;
  error?: Error;

  isSubmitLoading: boolean;
  submitFunc: () => void;

  setActionName: (name: string) => void;
  advancedModeInput: AdvancedModeInput;
  setAdvancedModeInput: (advModeInput: AdvancedModeInput) => void;
}

export function ActionSummary({
  error,
  data,
  isSubmitLoading,
  advancedModeInput,
  submitFunc,
  setActionName,
  setAdvancedModeInput,
}: ActionSummaryProps) {
  const [editableInputName, setEditableInputName] = useState(false);

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const actionNameField = () => {
    if (editableInputName) {
      return (
        <Input
          defaultValue={data.input.name}
          bordered={false}
          onBlur={(f) => {
            setActionName(f.target.value);
            setEditableInputName(false);
          }}
          ref={(ref) => {
            ref?.focus({
              cursor: "all",
            });
          }}
        />
      );
    }
    return (
      <>
        {data.input.name}
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => setEditableInputName(true)}
        />
      </>
    );
  };

  const inputParamsSource = (parameters?: string) => {
    if (!parameters) {
      return undefined;
    }
    const objParams = JSON.parse(data.input.input?.parameters ?? {});
    return Object.keys(objParams).map((key) => {
      return {
        name: key,
        value: objParams[key],
      };
    });
  };

  const inputTypeInstances = data.input.input?.typeInstances ?? [];
  const inputTypeInstanceData: GenericTypeInstanceData[] =
    inputTypeInstances.map((ti) => {
      return {
        id: ti.id,
        name: ti.name,
      };
    });

  // maybe extra as switch to advance mode?
  return (
    <Content className="action-summary">
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Name">{actionNameField()}</Descriptions.Item>
        <Descriptions.Item label="Interface">
          <Text code>
            {data.input.actionRef.path}:{data.input.actionRef.revision}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Implementation">
          {data.actionImplPath ? (
            <Text code>{data.actionImplPath}</Text>
          ) : (
            <Text>
              Select by Engine, during render process. Can be preselected in
              advanced settings tab.
            </Text>
          )}
        </Descriptions.Item>
      </Descriptions>
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
                dataSource={inputParamsSource(data.input.input?.parameters)}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Input TypeInstances">
              <TypeInstancesListContainer data={inputTypeInstanceData} />
            </Descriptions.Item>
            <Descriptions.Item label="Action Policy">
              {data.input.input?.actionPolicy ? (
                <Paragraph>
                  <pre className="scrollable">
                    {JSON.stringify(data.input.input.actionPolicy, null, 4)}
                  </pre>
                </Paragraph>
              ) : (
                <Text>No Action Policy</Text>
              )}
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane
          tab={
            <>
              <SettingOutlined style={{ marginRight: "6px" }} />
              {"Advanced Settings"}
            </>
          }
          key="2"
        >
          <SelectActionImplContainer
            actRef={
              new ResourceReference(
                data?.input.actionRef.path,
                data?.input.actionRef.revision
              )
            }
            advancedModeInput={advancedModeInput}
            setAdvancedModeInput={setAdvancedModeInput}
          />
        </TabPane>
      </Tabs>
      <Button
        className="summary-submit-btn"
        type="primary"
        onClick={submitFunc}
        loading={isSubmitLoading}
      >
        Submit
      </Button>
    </Content>
  );
}
