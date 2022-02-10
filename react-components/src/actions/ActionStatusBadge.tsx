import React from "react";
import { Badge } from "antd";
import { PresetColorType, PresetStatusColorType } from "antd/lib/_util/colors";
import { ActionStatusPhase } from "../generated/graphql";

export interface ActionStatusBadgeProps {
  phase?: ActionStatusPhase;
}

export function ActionStatusBadge({
  phase = ActionStatusPhase.Initial,
}: ActionStatusBadgeProps) {
  let badgeStatus: PresetStatusColorType | undefined;
  let badgeColor: PresetColorType | undefined;
  switch (phase) {
    case ActionStatusPhase.ReadyToRun:
      badgeColor = "cyan";
      break;
    case ActionStatusPhase.Running:
    case ActionStatusPhase.BeingRendered:
      badgeStatus = "processing";
      break;
    case ActionStatusPhase.Failed:
      badgeStatus = "error";
      break;
    case ActionStatusPhase.Succeeded:
      badgeStatus = "success";
      break;
    case ActionStatusPhase.BeingCanceled:
    case ActionStatusPhase.Canceled:
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
