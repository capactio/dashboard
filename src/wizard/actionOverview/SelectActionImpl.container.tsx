import React from "react";
import SelectActionImpl from "./SelectActionImpl";
import { useListImplForInterfaceQuery } from "../../generated/graphql";
import { ResourceReference } from "../ResourceRef";

export interface Implementation {
  displayName: string;
  implRef: ResourceReference;
  typeRef: ResourceReference[];
}

interface SelectActionImplContainerProps {
  actRef: ResourceReference;
  setActionImplAdditionalInput: (name: string, data: any) => void;
  setActionImplPath: (actionImplPath: string) => void;
}

function SelectActionImplContainer({
  actRef,
  setActionImplAdditionalInput,
  setActionImplPath,
}: SelectActionImplContainerProps) {
  const { data, isLoading, error } = useListImplForInterfaceQuery({
    path: actRef.path,
    rev: actRef.revision,
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
