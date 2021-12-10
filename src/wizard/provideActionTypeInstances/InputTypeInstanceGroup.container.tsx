import React from "react";
import {
  TypeInstance,
  TypeReference,
  useListTypeInstancesQuery,
} from "../../generated/graphql";
import InputTypeInstanceGroup from "./InputTypeInstanceGroup";

interface InputParametersContainerProps {
  typeRef: TypeReference;
  setInputTypeInstanceID: (id: string) => void;
}

function InputParametersFromTypeSectionContainer({
  typeRef,
  setInputTypeInstanceID,
}: InputParametersContainerProps) {
  const { data, isLoading, error } = useListTypeInstancesQuery({
    path: typeRef.path,
    rev: typeRef.revision,
  });

  return (
    <>
      <InputTypeInstanceGroup
        name={`${typeRef.path}:${typeRef.revision}`}
        isLoading={isLoading}
        error={error as Error | undefined}
        typeInstances={data?.typeInstances as TypeInstance[]}
        setInputTypeInstanceID={setInputTypeInstanceID}
      />
    </>
  );
}

export default InputParametersFromTypeSectionContainer;
