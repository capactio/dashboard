import React from "react";
import "./InputParameters.css";
import { JSONSchema7 } from "json-schema";
import { Button } from "antd";
import { ISubmitEvent } from "@rjsf/core";
import CenteredSpinner from "../../layout/CenteredSpinner";
import { ErrorAlert } from "@capactio/react-components";
import Form from "../../layout/Form";

interface InputParametersFormProps {
  isLoading: boolean;
  error?: Error;
  schema: JSONSchema7;
  initData: unknown;
  setInputParameter: (data: string) => void;
  formButton: FormButton;
}

export interface FormButton {
  label: string;
  className: string;
}

function InputParametersForm({
  isLoading,
  error,
  schema,
  initData,
  setInputParameter,
  formButton,
}: InputParametersFormProps) {
  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const onSuccessSubmit = ({ formData }: ISubmitEvent<string>) => {
    setInputParameter(formData);
  };

  return (
    <Form
      showErrorList={false}
      schema={schema}
      formData={initData}
      onSubmit={onSuccessSubmit}
      liveValidate={true}
    >
      <Button htmlType="submit" className={formButton.className} type="primary">
        {formButton.label}
      </Button>
    </Form>
  );
}

export default InputParametersForm;
