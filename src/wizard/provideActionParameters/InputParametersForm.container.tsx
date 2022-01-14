import React from "react";
import InputParametersFromTypeSectionContainer from "./InputParametersFromType.container";
import { TypeReference } from "../../generated/graphql";
import InputParametersForm, { FormButton } from "./InputParametersForm";
import { parseToJSONSchema7 } from "../JSONSchema";

interface InputParametersFormContainerProps {
  typeRef?: TypeReference | null;
  name: string;
  rawJSONSchema: string;
  initData: unknown;
  onSuccessSubmit: (data: string) => void;
  formButton: FormButton;
}

function InputParametersFormContainer({
  name,
  typeRef,
  rawJSONSchema,
  initData,
  onSuccessSubmit,
  formButton,
}: InputParametersFormContainerProps) {
  if (typeRef) {
    return (
      <InputParametersFromTypeSectionContainer
        key={name}
        initData={initData}
        typeRef={typeRef}
        setInputParameter={onSuccessSubmit}
        formButton={formButton}
      />
    );
  }

  const parsedSchema = parseToJSONSchema7(rawJSONSchema);

  return (
    <InputParametersForm
      key={name}
      initData={initData}
      isLoading={false}
      error={parsedSchema.error}
      schema={parsedSchema.schema}
      formButton={formButton}
      setInputParameter={onSuccessSubmit}
    />
  );
}

export default InputParametersFormContainer;
