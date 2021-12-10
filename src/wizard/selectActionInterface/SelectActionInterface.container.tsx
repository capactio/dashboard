import React from "react";
import SelectActionInterface from "./SelectActionInterface";
import { StepComponentProps, WizardData } from "../Wizard.container";
import {
  InterfaceRevision,
  useListInterfaceGroupsQuery,
} from "../../generated/graphql";

interface SelectActionInterfaceContainerProps extends StepComponentProps {}

function SelectActionInterfaceContainer({
  wizardData,
  setWizardData,
}: SelectActionInterfaceContainerProps) {
  const { data, error, isLoading } = useListInterfaceGroupsQuery();

  // filter out the runner and validation interfaces
  const setValue = (actionInterface?: InterfaceRevision) => {
    if (actionInterface === wizardData?.actionInterface) {
      return;
    }

    const actionInputParameters = new Map();
    setWizardData({
      ...wizardData,
      actionInterface,
      actionInputParameters,
    } as WizardData);
  };

  return (
    <SelectActionInterface
      data={data}
      error={error as Error}
      isLoading={isLoading}
      currentValue={wizardData?.actionInterface}
      setValue={setValue}
    />
  );
}

export default SelectActionInterfaceContainer;
