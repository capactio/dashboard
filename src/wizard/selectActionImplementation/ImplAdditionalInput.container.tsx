import React from "react";
import ImplAdditionalInputSection from "./ImplAdditionalInput";
import {
  TypeReference,
  useGetTypeJsonSchemaQuery,
} from "../../generated/graphql";
import { JSONSchema7 } from "json-schema";
import { errorOrUndefined, parseToJSONSchema7 } from "../JSONSchema";

interface InputParametersContainerProps {
  name?: string;
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
  const parsedSchema = parseToJSONSchema7(rawJSONSchema);

  const additionalInputSchema = convertToAdditionalInput(
    name,
    parsedSchema.schema
  );

  return (
    <>
      <ImplAdditionalInputSection
        isLoading={isLoading}
        error={errorOrUndefined([
          error,
          parsedSchema.error,
          additionalInputSchema.error,
        ])}
        additionalInputSchema={additionalInputSchema.additionalInput}
        setImplAdditionalInput={setImplAdditionalInput}
      />
    </>
  );
}

function convertToAdditionalInput(
  name: string | undefined,
  schema: JSONSchema7
): { error?: string; additionalInput: AdditionalInputSchema } {
  if (!name) {
    return {
      error: `name for schema cannot be undefined`,
      additionalInput: {} as AdditionalInputSchema,
    };
  }
  return {
    additionalInput: {
      name: name,
      jsonSchema: schema,
    },
  };
}

export default ImplAdditionalInputSectionContainer;
