import React from "react";
import {
  TypeReference,
  useGetTypeJsonSchemaQuery,
} from "../../generated/graphql";
import { InputParametersForm, FormButton } from "./InputParametersForm";
import { errorOrUndefined, parseToJSONSchema7 } from "../JSONSchema";

export interface InputParametersFromTypeSectionContainerProps {
  typeRef: TypeReference;
  setInputParameter: (data: string) => void;
  initData: unknown;
  formButton: FormButton;
}

export function InputParametersFromTypeSectionContainer({
  typeRef,
  initData,
  setInputParameter,
  formButton,
}: InputParametersFromTypeSectionContainerProps) {
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
      formButton={formButton}
      error={errorOrUndefined([error as Error | undefined, parsedSchema.error])}
      schema={parsedSchema.schema}
      setInputParameter={setInputParameter}
    />
  );
}
