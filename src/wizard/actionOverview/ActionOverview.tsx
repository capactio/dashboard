import React, { useState } from "react";
import "./SelectActionImpl.css";
import ErrorAlert from "../../layout/ErrorAlert";
import { Button, Descriptions, Input, Layout, Tabs, Typography } from "antd";
import InputParameters from "../../actions/ActionInputParameters";
import "./ActionOverview.css";
import SelectActionImplContainer from "./SelectActionImpl.container";
import { ResourceReference } from "../ResourceRef";
import { ActionOverviewInput } from "./ActionOverview.container";
import { EditOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface ActionOverviewProps {
  data: ActionOverviewInput;
  error?: Error;

  isSubmitLoading: boolean;
  submitFunc: () => void;

  setActionName: (name: string) => void;
  setActionImplAdditionalInput: (name: string, data: any) => void;
  setActionImplPath: (actionImplPath: string) => void;
}

function ActionOverview({
  error,
  data,
  isSubmitLoading,
  submitFunc,
  setActionName,
  setActionImplAdditionalInput,
  setActionImplPath,
}: ActionOverviewProps) {
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

  const objParams = JSON.parse(data.input.input?.parameters);
  const inputParamsSource = Object.keys(objParams).map((key) => {
    return {
      name: key,
      value: objParams[key],
    };
  });

  // maybe extra as switch to advance mode?
  return (
    <Content className="action-overview">
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
            <Text code>
              Select by Engine, during render process. Can be preselected in
              advanced settings tab.
            </Text> // to note style or btn to navigate to advanced tab?
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
              <InputParameters dataSource={inputParamsSource} />
            </Descriptions.Item>
            <Descriptions.Item label="Input TypeInstances">
              {/*TODO: display Input TypeInstances. The TypeInstancesList needs to be refactored:
                   - change to container and embed modal with details
                   - change data to dataSource
                */}
              <Text>No Input TypeInstances</Text>
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
        <TabPane tab="Advanced Settings" key="2">
          {/*TODO: add reset option*/}
          <SelectActionImplContainer
            actRef={
              new ResourceReference(
                data?.input.actionRef.path,
                data?.input.actionRef.revision
              )
            }
            setActionImplPath={setActionImplPath}
            setActionImplAdditionalInput={setActionImplAdditionalInput}
          />
        </TabPane>
      </Tabs>
      {/*TODO(https://github.com/capactio/backlog/issues/30): Remove after btn refactor */}
      <Button
        className="overview-submit-btn"
        type="primary"
        onClick={submitFunc}
        loading={isSubmitLoading}
      >
        Submit
      </Button>
    </Content>
  );
}

export default ActionOverview;
