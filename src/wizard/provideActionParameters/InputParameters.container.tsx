import React from "react";
import InputParameters from "./InputParameters";
import { StepComponentProps, WizardData } from "../Wizard.container";
import WizardNavigator from "../WizardNavigator";

interface InputParametersContainerProps extends StepComponentProps {}

function InputParametersContainer({
  wizardData = {},
  setWizardData,
  // TODO: Temp
  previousStepFn,
  nextStepFn,
  currentIndex,
}: InputParametersContainerProps) {
  const inputParams = wizardData?.actionInterface?.spec.input.parameters ?? [];

  const submitFn = async (name: string, data: any) => {
    const actionInputParameters = {
      ...wizardData.actionInputParameters,
      [name]: data,
    };
    setWizardData({ ...wizardData, actionInputParameters } as WizardData);
  };

  const requiredLen = inputParams.length ?? 0;
  const submittedLen = Object.keys(
    wizardData?.actionInputParameters ?? {}
  ).length;

  const wasAllDataProvided = requiredLen === submittedLen;

  return (
    <>
      <InputParameters
        setInputParameter={submitFn}
        initInputParametersData={wizardData?.actionInputParameters}
        isLoading={false}
        inputParamsSchemas={inputParams}
      />
      <WizardNavigator
        previousStepFn={previousStepFn}
        nextStepFn={nextStepFn}
        canProceed={wasAllDataProvided}
      />
    </>
  );
}

export default InputParametersContainer;
