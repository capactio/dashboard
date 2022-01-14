import React from "react";
import {
  TypeReference,
  useGetTypeJsonSchemaQuery,
} from "../../generated/graphql";
import InputParametersForm from "./InputParametersForm";
import { errorOrUndefined, parseToJSONSchema7 } from "../JSONSchema";

interface InputParametersContainerProps {
  typeRef: TypeReference;
  setInputParameter: (data: string) => void;
  initData: unknown;
}

function InputParametersFromTypeSectionContainer({
  typeRef,
  initData,
  setInputParameter,
}: InputParametersContainerProps) {
  const { data, isLoading, error } = useGetTypeJsonSchemaQuery({
    path: typeRef.path,
    rev: typeRef.revision,
  });
  const rawJSONSchema = data?.type?.revision?.spec.jsonSchema ?? "{}";
  const parsedSchema = parseToJSONSchema7(rawJSONSchema);

  return (
    <InputParametersForm
      isLoading={isLoading}
      initData={initData}
      error={errorOrUndefined([error as Error | undefined, parsedSchema.error])}
      schema={parsedSchema.schema}
      setInputParameter={setInputParameter}
    />
  );
}

export default InputParametersFromTypeSectionContainer;
