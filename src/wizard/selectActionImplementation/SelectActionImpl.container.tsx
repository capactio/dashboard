import React from "react";
import SelectActionImpl from "./SelectActionImpl";
import { StepComponentProps, WizardData } from "../Wizard.container";
import { useListImplForInterfaceQuery } from "../../generated/graphql";
import { ResourceReference } from "../ResourceRef";

export interface Implementation {
  displayName: string;
  implRef: ResourceReference;
  typeRef: ResourceReference[];
}

interface SelectActionImplContainerProps extends StepComponentProps {}

function SelectActionImplContainer({
  wizardData,
  setWizardData,
}: SelectActionImplContainerProps) {
  const { data, isLoading, error } = useListImplForInterfaceQuery({
    path: wizardData?.actionInterface?.metadata.path,
    rev: wizardData?.actionInterface?.revision,
  });

  const rawData = data?.interface?.revision?.implementationRevisions ?? [];
  const impls = rawData.map((item) => {
    const rawParams = item.spec?.additionalInput?.parameters ?? [];
    const inputs = rawParams.map((p) => {
      return new ResourceReference(p.typeRef.path, p.typeRef.revision, p.name);
    });

    return {
      displayName: item.metadata.displayName as string,
      implRef: new ResourceReference(item.metadata.path, item.revision),
      typeRef: inputs,
    } as Implementation;
  });

  const setActionImplPath = (actionImplPath: string) =>
    setWizardData({
      ...wizardData,
      actionImplPath,
    } as WizardData);

  const setActionImplAdditionalInput = (name: string, data: any) => {
    const actionImplAdditionalInput = {
      ...wizardData!.actionImplAdditionalInput,
      [name]: data,
    };
    setWizardData({
      ...wizardData,
      actionImplAdditionalInput,
    } as WizardData);
  };

  return (
    <SelectActionImpl
      isLoading={isLoading}
      implementation={impls}
      setActionImplPath={setActionImplPath}
      setActionImplAdditionalInput={setActionImplAdditionalInput}
      error={error as Error | undefined}
    />
  );
}

export default SelectActionImplContainer;
