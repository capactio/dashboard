import React from "react";
import {
  TypeReference,
  useGetTypeJsonSchemaQuery,
} from "../../generated/graphql";
import InputParametersForm from "./InputParametersForm";
import { ErrorOrUndefined, ParseToJSONSchema7 } from "../JSONSchema";

interface InputParametersContainerProps {
  typeRef: TypeReference;
  setInputParameter: (data: any) => void;
  initData: any;
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
  const parsedSchema = ParseToJSONSchema7(rawJSONSchema);

  return (
    <>
      <InputParametersForm
        isLoading={isLoading}
        initData={initData}
        error={ErrorOrUndefined([error, parsedSchema.error])}
        schema={parsedSchema.schema}
        setInputParameter={setInputParameter}
      />
    </>
  );
}

export default InputParametersFromTypeSectionContainer;
