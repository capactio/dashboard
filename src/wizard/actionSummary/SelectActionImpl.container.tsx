import React from "react";
import SelectActionImpl from "./SelectActionImpl";
import { useListImplForInterfaceQuery } from "../../generated/graphql";
import { ResourceReference } from "../ResourceRef";
import { AdvancedModeInput } from "./ActionSummary.container";

export interface Implementation {
  displayName: string;
  implRef: ResourceReference;
  typeRef: ResourceReference[];
}

interface SelectActionImplContainerProps {
  actRef: ResourceReference;
  advancedModeInput: AdvancedModeInput;
  setAdvancedModeInput: (advModeInput: AdvancedModeInput) => void;
}

function SelectActionImplContainer({
  actRef,
  advancedModeInput,
  setAdvancedModeInput,
}: SelectActionImplContainerProps) {
  const { data, isLoading, error } = useListImplForInterfaceQuery({
    path: actRef.path,
    rev: actRef.revision,
  });

  const setActionImplPath = (actionImplPath: string) =>
    setAdvancedModeInput({
      ...advancedModeInput,
      actionImplPath,
    });

  const setActionImplAdditionalInput = (name: string, data: unknown) => {
    const actionImplAdditionalInput = {
      ...advancedModeInput.actionImplAdditionalInput,
      [name]: data,
    };
    setAdvancedModeInput({
      ...advancedModeInput,
      actionImplAdditionalInput,
    });
  };

  const resetActionImplPath = () => {
    setAdvancedModeInput({
      ...advancedModeInput,
      actionImplPath: undefined,
      actionImplAdditionalInput: undefined,
    });
  };

  const resetActionImplAdditionalInput = (name: string) => {
    const actionImplAdditionalInput = {
      ...advancedModeInput.actionImplAdditionalInput,
    };

    delete actionImplAdditionalInput[name];
    setAdvancedModeInput({
      ...advancedModeInput,
      actionImplAdditionalInput,
    });
  };

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

  return (
    <SelectActionImpl
      isLoading={isLoading}
      implementation={impls}
      currentImplPath={advancedModeInput.actionImplPath}
      setActionImplPath={setActionImplPath}
      resetActionImplPath={resetActionImplPath}
      setActionImplAdditionalInput={setActionImplAdditionalInput}
      resetActionImplAdditionalInput={resetActionImplAdditionalInput}
      error={error as Error | undefined}
    />
  );
}

export default SelectActionImplContainer;
