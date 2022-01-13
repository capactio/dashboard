import React from "react";
import InputTypeInstances from "./InputTypeInstances";
import { StepComponentProps, WizardData } from "../Wizard.container";
import { InputTypeInstance } from "../../generated/graphql";

interface InputTypeInstancesContainerProps extends StepComponentProps {}

function InputTypeInstancesContainer({
  wizardData,
  setWizardData,
}: InputTypeInstancesContainerProps) {
  const allInputTI =
    wizardData?.actionInterface?.spec.input.typeInstances ?? [];
  const inputTI = allInputTI.filter(
    (item): item is InputTypeInstance => item !== null
  );

  const submitFn = async (name: string, data: string) => {
    const actionInputTypeInstances = {
      ...wizardData?.actionInputTypeInstances,
      [name]: data,
    };
    setWizardData({ ...wizardData, actionInputTypeInstances } as WizardData);
  };

  return (
    <InputTypeInstances
      setInputTypeInstance={submitFn}
      inputTypeInstances={wizardData?.actionInputTypeInstances}
      isLoading={false}
      inputTypeInstancesRefs={inputTI}
    />
  );
}

export default InputTypeInstancesContainer;
