import { message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { loadRuntimeConfig } from "../config/runtime";
import {
  ActionStatusPhase,
  useActionQuery,
  useRunActionMutation,
  useDeleteActionMutation,
} from "../generated/graphql";

import Action from "./Action";

interface ActionContainerProps {
  name: string;
}

function ActionContainer({ name }: ActionContainerProps) {
  const { queryRefetchIntervalMS } = loadRuntimeConfig();
  const { data, error, isLoading } = useActionQuery(
    { actionName: name },
    { refetchInterval: queryRefetchIntervalMS }
  );
  const navigate = useNavigate();
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
      navigate("/actions");
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
    const { argoWorkflowsUIBaseURL } = loadRuntimeConfig();
    argoWorkflowLink = `${argoWorkflowsUIBaseURL}/workflows/${namespace}/${name}?tab=workflow`;
  }

  return (
    <Action
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

export default ActionContainer;
