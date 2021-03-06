import React from "react";
import { InputParameters } from "./InputParameters";
import { StepComponentProps, WizardData } from "../Wizard.container";

export interface InputParametersContainerProps extends StepComponentProps {}

export function InputParametersContainer({
  wizardData = {},
  setWizardData,
  navigateToNextStep,
}: InputParametersContainerProps) {
  const inputParams = wizardData?.actionInterface?.spec.input.parameters ?? [];

  const submitFn = async (name: string, data: unknown) => {
    const actionInputParameters = {
      ...wizardData.actionInputParameters,
      [name]: data,
    };
    setWizardData({ ...wizardData, actionInputParameters } as WizardData);

    const requiredLen = inputParams.length ?? 0;
    const submittedLen = Object.keys(actionInputParameters ?? {}).length;
    const wasAllDataProvided = requiredLen === submittedLen;

    if (inputParams.length === 1 && wasAllDataProvided) {
      navigateToNextStep();
    }
  };

  return (
    <InputParameters
      setInputParameter={submitFn}
      initInputParametersData={wizardData?.actionInputParameters}
      isLoading={false}
      inputParamsSchemas={inputParams}
    />
  );
}
