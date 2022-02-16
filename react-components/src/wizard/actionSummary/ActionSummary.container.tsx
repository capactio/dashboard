import { InputCollectionObj, StepComponentProps } from "../Wizard.container";
import {
  CreateActionWithInputMutationVariables,
  useCreateActionWithInputMutation,
} from "../../generated/graphql";
import {
  Config,
  adjectives,
  colors,
  names,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { ActionSummary } from "./ActionSummary";
import React, { useState } from "react";
import { createActionGQLInput } from "./create-action-gql-input";
import { message } from "antd";

// generated name must match: '[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*'
const genAdjsColorsAndNames: Config = {
  dictionaries: [adjectives, colors, names],
  separator: "-",
  length: 3,
};

export interface ActionSummaryContainerProps extends StepComponentProps {
  onActionCreate: (name: string) => void;
}

export interface ActionSummaryInput
  extends CreateActionWithInputMutationVariables {
  actionImplPath: string;
}

// TODO: this will grow as we need to handle also:
//  - Provide additional input TypeInstances
//  - Attributes
//  - If required TypeInstances has alias, provide option to select a proper TypeInstance, e.g. AWS creds.
export interface AdvancedModeInput {
  actionName: string;
  actionImplAdditionalInput?: InputCollectionObj;
  actionImplPath?: string;
}

export function ActionSummaryContainer({ wizardData, onActionCreate }: ActionSummaryContainerProps) {
  const defaultActionRandomName = uniqueNamesGenerator(genAdjsColorsAndNames);
  const [advancedInput, setAdvancedInput] = useState<AdvancedModeInput>({
    actionName: defaultActionRandomName,
  });

  const input = createActionGQLInput(wizardData, advancedInput);

  const { mutateAsync, isLoading } = useCreateActionWithInputMutation();

  const submitFn = async () => {
    try {
      const data = await mutateAsync(input);
      message.success(
        `Action '${data?.createAction.name}' created successfully`
      );
      onActionCreate(data?.createAction.name);
    } catch (error) {
      message.error(`Failed to submit Action. Got error: ${error}`);
    }
  };

  const setActionName = (actionName: string) => {
    setAdvancedInput({
      ...advancedInput,
      actionName,
    });
  };

  return (
    <ActionSummary
      data={
        {
          ...input,
          actionImplPath: advancedInput.actionImplPath,
        } as ActionSummaryInput
      }
      isSubmitLoading={isLoading}
      submitFunc={submitFn}
      setAdvancedModeInput={setAdvancedInput}
      advancedModeInput={advancedInput}
      setActionName={setActionName}
    />
  );
}
