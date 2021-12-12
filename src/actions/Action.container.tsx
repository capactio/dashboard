import { message } from "antd";
import React, { useState } from "react";
import {
  ARGO_WORKFLOWS_UI_BASE_URL,
  QUERY_REFETCH_INTERVAL_MS,
} from "../config";
import {
  ActionStatusPhase,
  useActionQuery,
  useRunActionMutation,
} from "../generated/graphql";

import Action from "./Action";
import TypeInstanceDetailsContainer, {
  TypeInstanceDetailsState,
} from "./TypeInstanceDetails.container";

interface ActionContainerProps {
  name: string;
}

interface TypeInstanceDetails {
  typeInstanceID?: string;
  visible: boolean;
}

function ActionContainer({ name }: ActionContainerProps) {
  const { data, error, isLoading } = useActionQuery(
    { actionName: name },
    { refetchInterval: QUERY_REFETCH_INTERVAL_MS }
  );
  const runActionMutation = useRunActionMutation();

  const [typeInstanceDetailsState, setTypeInstanceDetailsState] =
    useState<TypeInstanceDetails>({ visible: false });

  const showTypeInstanceDetails = (typeInstanceID: string) => {
    setTypeInstanceDetailsState({
      visible: true,
      typeInstanceID,
    });
  };

  const hideTypeInstanceDetails = () => {
    setTypeInstanceDetailsState({
      ...typeInstanceDetailsState,
      visible: false,
    });
  };

  const runAction = () => {
    runActionMutation.mutate({ actionName: name });
    message.success(`Action '${name}' run successfully`);
  };

  const canBeRun =
    data?.action?.status?.phase === ActionStatusPhase.ReadyToRun &&
    !(runActionMutation.isError || runActionMutation.isSuccess);
  const hasBeenRun = [
    ActionStatusPhase.Running,
    ActionStatusPhase.Succeeded,
    ActionStatusPhase.Failed,
  ].includes(data?.action?.status?.phase ?? ActionStatusPhase.Initial);

  let argoWorkflowLink;
  if (hasBeenRun) {
    // TODO: Get namespace and name from Runner status
    // Unfortunately we cannot do that now as Runner reports its status at the end of this workflow,
    // which is a tad late
    const namespace = "default";
    argoWorkflowLink = `${ARGO_WORKFLOWS_UI_BASE_URL}/workflows/${namespace}/${name}?tab=workflow`;
  }

  return (
    <>
      {typeInstanceDetailsState.typeInstanceID && (
        <TypeInstanceDetailsContainer
          state={typeInstanceDetailsState as TypeInstanceDetailsState}
          hideFn={hideTypeInstanceDetails}
        />
      )}
      <Action
        data={data}
        error={error as Error}
        isLoading={isLoading}
        canBeRun={canBeRun}
        isRunActionLoading={runActionMutation.isLoading}
        hasBeenRun={hasBeenRun}
        argoWorkflowLink={argoWorkflowLink}
        showTypeInstanceDetails={showTypeInstanceDetails}
        runAction={runAction}
      />
    </>
  );
}

export default ActionContainer;
