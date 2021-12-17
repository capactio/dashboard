import { CheckCircleOutlined } from "@ant-design/icons";
import React from "react";
import { Tabs, Typography } from "antd";

const { TabPane } = Tabs;

interface TabbingProps {
  data: any[];
  renderContent: (data: any) => React.ReactElement;
  satisfiedNameTuple: (data: any) => [satisfied: boolean, name: string];
  setCurrentIdx: (idx: number) => void;
  currentIdx: number;
}

function Tabbing({
  data,
  renderContent,
  satisfiedNameTuple,
  setCurrentIdx,
  currentIdx,
}: TabbingProps) {
  switch (data.length) {
    case 0:
      return <Typography.Text key="empty">No data to display</Typography.Text>;
    case 1:
      return renderContent(data[0]);
    default:
      const tabs = data.map((item, idx) => {
        const form = renderContent(item);
        return (
          <TabPane
            tab={tabPaneName(...satisfiedNameTuple(item))}
            key={idx.toString()}
          >
            {form}
          </TabPane>
        );
      });

      return (
        <Tabs
          tabPosition="left"
          style={{ maxHeight: 550, minHeight: 420, overflow: "auto" }}
          onChange={(item) => setCurrentIdx(Number(item))}
          activeKey={currentIdx.toString()}
        >
          {tabs}
        </Tabs>
      );
  }
}

function tabPaneName(satisfied: boolean, name: string) {
  return (
    <>
      {satisfied ? <CheckCircleOutlined /> : null}
      {name}
    </>
  );
}

export default Tabbing;
