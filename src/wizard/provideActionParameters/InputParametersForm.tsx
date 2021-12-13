import React from "react";
import "./InputParameters.css";
import { JSONSchema7 } from "json-schema";
import { Button } from "antd";
import { ISubmitEvent, withTheme } from "@rjsf/core";
import { Theme as FluentUITheme } from "@rjsf/fluent-ui";
import CenteredSpinner from "../../layout/CenteredSpinner";
import ErrorAlert from "../../layout/ErrorAlert";

interface InputParametersFormProps {
  isLoading: boolean;
  error?: Error;
  schema: JSONSchema7;
  initData: any;
  setInputParameter: (data: any) => void;
}

function InputParametersForm({
  isLoading,
  error,
  schema,
  initData,
  setInputParameter,
}: InputParametersFormProps) {
  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const onSuccessSubmit = ({ formData }: ISubmitEvent<any>) => {
    setInputParameter(formData);
  };

  const Form = withTheme(FluentUITheme);
  return (
    <>
      <Form
        showErrorList={false}
        schema={schema}
        formData={initData}
        onSubmit={onSuccessSubmit}
        liveValidate={true}
      >
        <Button htmlType="submit" className="form-submit-btn" type="primary">
          Next
        </Button>
      </Form>
    </>
  );
}

export default InputParametersForm;
