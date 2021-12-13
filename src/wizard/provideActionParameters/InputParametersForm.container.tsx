import React from "react";
import InputParametersFromTypeSectionContainer from "./InputParametersFromType.container";
import { TypeReference } from "../../generated/graphql";
import InputParametersForm from "./InputParametersForm";
import { parseToJSONSchema7 } from "../JSONSchema";

interface InputParametersFormContainerProps {
  typeRef?: TypeReference | null;
  name: string;
  rawJSONSchema: string;
  initData: any;
  onSuccessSubmit: (data: any) => void;
}

function InputParametersFormContainer({
  name,
  typeRef,
  rawJSONSchema,
  initData,
  onSuccessSubmit,
}: InputParametersFormContainerProps) {
  if (typeRef) {
    return (
      <InputParametersFromTypeSectionContainer
        key={name}
        initData={initData}
        typeRef={typeRef}
        setInputParameter={onSuccessSubmit}
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
      setInputParameter={onSuccessSubmit}
    />
  );
}

export default InputParametersFormContainer;
