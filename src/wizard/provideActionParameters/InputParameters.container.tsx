import React from "react";
import InputParameters from "./InputParameters";
import { StepComponentProps, WizardData } from "../Wizard.container";

interface InputParametersContainerProps extends StepComponentProps {}

function InputParametersContainer({
  wizardData = {},
  setWizardData,
  navigateToNextStep,
}: InputParametersContainerProps) {
  const inputParams = wizardData?.actionInterface?.spec.input.parameters ?? [];

  const submitFn = async (name: string, data: any) => {
    const actionInputParameters = {
      ...wizardData.actionInputParameters,
      [name]: data,
    };
    setWizardData({ ...wizardData, actionInputParameters } as WizardData);

    const requiredLen = inputParams.length ?? 0;
    const submittedLen = Object.keys(actionInputParameters ?? {}).length;
    const wasAllDataProvided = requiredLen === submittedLen;

    if (wasAllDataProvided) {
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

export default InputParametersContainer;
