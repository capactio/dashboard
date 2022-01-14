import React from "react";
import ImplAdditionalInputSection from "./SelectImplAdditionalInput";
import {
  TypeReference,
  useGetTypeJsonSchemaQuery,
} from "../../generated/graphql";
import { JSONSchema7 } from "json-schema";
import { errorOrUndefined, parseToJSONSchema7 } from "../JSONSchema";

export interface AdditionalInputSchema {
  name: string;
  jsonSchema: JSONSchema7;
}

interface InputParametersContainerProps {
  name: string;
  typeRef: TypeReference;
  setImplAdditionalInput: (name: string, data: unknown) => void;
  resetImplAdditionalInput: (name: string) => void;
}

function ImplAdditionalInputSectionContainer({
  name,
  typeRef,
  setImplAdditionalInput,
  resetImplAdditionalInput,
}: InputParametersContainerProps) {
  const { data, isLoading, error } = useGetTypeJsonSchemaQuery({
    path: typeRef.path,
    rev: typeRef.revision,
  });
  const rawJSONSchema = data?.type?.revision?.spec.jsonSchema ?? "{}";
  const parsedSchema = parseToJSONSchema7(rawJSONSchema);

  const additionalInputSchema = {
    additionalInput: {
      name: name,
      jsonSchema: parsedSchema.schema,
    },
  };

  return (
    <ImplAdditionalInputSection
      isLoading={isLoading}
      error={errorOrUndefined([error as Error | undefined, parsedSchema.error])}
      additionalInputSchema={additionalInputSchema.additionalInput}
      setImplAdditionalInput={setImplAdditionalInput}
      resetImplAdditionalInput={resetImplAdditionalInput}
    />
  );
}

export default ImplAdditionalInputSectionContainer;
