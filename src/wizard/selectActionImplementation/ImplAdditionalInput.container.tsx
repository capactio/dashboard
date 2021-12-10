import React from "react";
import ImplAdditionalInputSection from "./ImplAdditionalInput";
import {
  TypeReference,
  useGetTypeJsonSchemaQuery,
} from "../../generated/graphql";
import { JSONSchema7 } from "json-schema";
import { ErrorOrUndefined, ParseToJSONSchema7 } from "../JSONSchema";

interface InputParametersContainerProps {
  name: string;
  typeRef: TypeReference;
  setImplAdditionalInput: (name: string, data: any) => void;
}

export interface AdditionalInputSchema {
  name: string;
  jsonSchema: JSONSchema7;
}

function ImplAdditionalInputSectionContainer({
  name,
  typeRef,
  setImplAdditionalInput,
}: InputParametersContainerProps) {
  const { data, isLoading, error } = useGetTypeJsonSchemaQuery({
    path: typeRef.path,
    rev: typeRef.revision,
  });
  const rawJSONSchema = data?.type?.revision?.spec.jsonSchema ?? "{}";
  const parsedSchema = ParseToJSONSchema7(rawJSONSchema);

  const additionalInputSchema: AdditionalInputSchema = {
    name: name,
    jsonSchema: parsedSchema.schema,
  };

  return (
    <>
      <ImplAdditionalInputSection
        isLoading={isLoading}
        error={ErrorOrUndefined([error, parsedSchema.error])}
        additionalInputSchema={additionalInputSchema}
        setImplAdditionalInput={setImplAdditionalInput}
      />
    </>
  );
}

export default ImplAdditionalInputSectionContainer;
