import React from "react";
import InputParameters from "./InputParameters";
import { StepComponentProps, WizardData } from "../Wizard.container";

interface InputParametersContainerProps extends StepComponentProps {}

function InputParametersContainer({
  wizardData = {},
  setWizardData,
}: InputParametersContainerProps) {
  const inputParams = wizardData?.actionInterface?.spec.input.parameters ?? [];

  const submitFn = async (name: string, data: any) => {
    const actionInputParameters = {
      ...wizardData.actionInputParameters,
      [name]: data,
    };
    setWizardData({ ...wizardData, actionInputParameters } as WizardData);
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
