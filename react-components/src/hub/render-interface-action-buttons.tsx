import React from "react";

import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { InterfaceRevisionWithKey } from ".";
import { Button } from "antd";

export function renderInterfaceActionsButtons(
  rev: InterfaceRevisionWithKey,
  onInterfaceClick: () => void
): React.ReactNode[] {
  const btns = [
    <Button type="link" onClick={onInterfaceClick}>
      <PlusCircleOutlined /> Create Action
    </Button>,
  ];
  if (rev?.metadata.documentationURL) {
    btns.unshift(
      <a
        href={rev.metadata.documentationURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <InfoCircleOutlined /> Documentation
      </a>
    );
  }
  return btns;
}
