import React from "react";
import { Badge } from "antd";
import { PresetColorType, PresetStatusColorType } from "antd/lib/_util/colors";

interface ActionStatusProps {
  phase: string;
}

function ActionStatus({ phase }: ActionStatusProps) {
  let badgeStatus: PresetStatusColorType | undefined;
  let badgeColor: PresetColorType | undefined;
  switch (phase) {
    case "READY_TO_RUN":
      badgeColor = "cyan";
      break;
    case "RUNNING":
    case "BEING_RENDERED":
      badgeStatus = "processing";
      break;
    case "FAILED":
      badgeStatus = "error";
      break;
    case "SUCCEEDED":
      badgeStatus = "success";
      break;
    case "BEING_CANCELED":
    case "CANCELED":
      badgeStatus = "warning";
      break;
    default:
      // INITIAL
      // ADVANCED_MODE_RENDERING_ITERATION
      badgeStatus = "default";
  }

  const phaseDisplayText = phase
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <span>
      <Badge
        status={badgeStatus}
        color={badgeColor}
        key={phase}
        text={phaseDisplayText}
      />
    </span>
  );
}

export default ActionStatus;
