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
import ActionOverview from "./ActionOverview";
import React, { useState } from "react";
import { createActionGQLInput } from "./CreateActionGQLInput";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

// generated name must match: '[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*'
const genAdjsColorsAndNames: Config = {
  dictionaries: [adjectives, colors, names],
  separator: "-",
  length: 3,
};

interface ActionOverviewContainerProps extends StepComponentProps {}

export interface ActionOverviewInput
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

function ActionOverviewContainer({ wizardData }: ActionOverviewContainerProps) {
  const [advanceInput, setAdvancedInput] = useState<AdvancedModeInput>({
    actionName: uniqueNamesGenerator(genAdjsColorsAndNames), // default random name
  });

  const input = createActionGQLInput(wizardData, advanceInput);

  const setActionName = (actionName: string) =>
    setAdvancedInput({
      ...advanceInput,
      actionName,
    });

  const setActionImplPath = (actionImplPath: string) =>
    setAdvancedInput({
      ...advanceInput,
      actionImplPath,
    });

  const setActionImplAdditionalInput = (name: string, data: any) => {
    const actionImplAdditionalInput = {
      ...advanceInput.actionImplAdditionalInput,
      [name]: data,
    };
    setAdvancedInput({
      ...advanceInput,
      actionImplAdditionalInput,
    });
  };

  const { mutateAsync, isLoading } = useCreateActionWithInputMutation();
  const navigate = useNavigate();

  const submitFn = async () => {
    try {
      const data = await mutateAsync(input);
      message.success(
        `Action '${data?.createAction.name}' created successfully`
      );
      navigate(`/actions/${data?.createAction.name}`);
    } catch (error) {
      message.error(`Failed to submit Action. Got error: ${error}`);
    }
  };

  return (
    <>
      <ActionOverview
        data={
          {
            ...input,
            actionImplPath: advanceInput.actionImplPath,
          } as ActionOverviewInput
        }
        isSubmitLoading={isLoading}
        submitFunc={submitFn}
        setActionName={setActionName}
        setActionImplPath={setActionImplPath}
        setActionImplAdditionalInput={setActionImplAdditionalInput}
      />
    </>
  );
}

export default ActionOverviewContainer;
