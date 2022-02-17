import { message } from "antd";
import React from "react";

import {
  ActionStatusPhase,
  useActionQuery,
  useRunActionMutation,
  useDeleteActionMutation,
} from "../generated/graphql";

import { ActionDetails } from "./ActionDetails";

export interface ActionDetailsContainerProps {
  name: string;
  refetchInterval?: number;
  argoWorkflowsUIBaseURL: string;
  onDeleteAction?: (name: string) => void;
}

export function ActionDetailsContainer({
  name,
  refetchInterval,
  argoWorkflowsUIBaseURL,
  onDeleteAction,
}: ActionDetailsContainerProps) {
  const { data, error, isLoading } = useActionQuery(
    { actionName: name },
    { refetchInterval }
  );

  const runActionMutation = useRunActionMutation();
  const deleteActionMutation = useDeleteActionMutation();

  const runAction = async () => {
    try {
      await runActionMutation.mutateAsync({ actionName: name });
      message.success(`Action '${name}' run successfully`);
    } catch (err) {
      const error = err as Error;
      message.error(
        `Failed to run Action. Got error: ${error.name}: ${error.message}`
      );
    }
  };

  const deleteAction = async () => {
    try {
      await deleteActionMutation.mutateAsync({ actionName: name });
      message.success(`Successfully scheduled Action '${name}' deletion`);
      if (onDeleteAction) {
        onDeleteAction(name);
      }
    } catch (err) {
      const error = err as Error;
      message.error(
        `Failed to delete Action. Got error: ${error.name}: ${error.message}`
      );
    }
  };

  const canBeRun =
    data?.action?.status?.phase === ActionStatusPhase.ReadyToRun &&
    !runActionMutation.isSuccess;
  const hasBeenRun = [
    ActionStatusPhase.Running,
    ActionStatusPhase.Succeeded,
    ActionStatusPhase.Failed,
  ].includes(data?.action?.status?.phase ?? ActionStatusPhase.Initial);
  const canBeDeleted =
    data?.action?.status?.phase !== ActionStatusPhase.Running;

  let argoWorkflowLink;
  if (hasBeenRun) {
    // TODO: Get namespace and name from Runner status
    // Unfortunately we cannot do that now as Runner reports its status at the end of this workflow,
    // which is a tad late
    const namespace = "default";
    argoWorkflowLink = `${argoWorkflowsUIBaseURL}/workflows/${namespace}/${name}?tab=workflow`;
  }

  return (
    <ActionDetails
      canBeDeleted={canBeDeleted}
      data={data}
      error={error as Error}
      isLoading={isLoading}
      canBeRun={canBeRun}
      isRunActionLoading={runActionMutation.isLoading}
      isDeleteActionLoading={deleteActionMutation.isLoading}
      hasBeenRun={hasBeenRun}
      argoWorkflowLink={argoWorkflowLink}
      runAction={runAction}
      deleteAction={deleteAction}
    />
  );
}
