import { CheckCircleOutlined } from "@ant-design/icons";
import React from "react";
import { Tabs, Typography } from "antd";

const { TabPane } = Tabs;

export interface Tab {
  name: string;
  showCheckmarkIcon: boolean;
  content: React.ReactElement;
}

interface TabbingProps {
  data: Tab[];
  setCurrentIdx: (idx: number) => void;
  currentIdx: number;
}

function Tabbing({ data, setCurrentIdx, currentIdx }: TabbingProps) {
  switch (data.length) {
    case 0:
      return <Typography.Text key="empty">No data to display</Typography.Text>;
    case 1:
      return data[0].content;
    default:
      const tabs = data.map(({ name, content, showCheckmarkIcon }, idx) => {
        const tabPaneNameComponent = (
          <>
            {showCheckmarkIcon && <CheckCircleOutlined />}
            {name}
          </>
        );

        return (
          <TabPane tab={tabPaneNameComponent} key={idx.toString()}>
            {content}
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

export default Tabbing;
