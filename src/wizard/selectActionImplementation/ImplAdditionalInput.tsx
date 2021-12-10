import React, { useState } from "react";
import CenteredSpinner from "../../layout/CenteredSpinner";
import { ISubmitEvent, withTheme } from "@rjsf/core";
import { Button, Modal } from "antd";
import { Theme as FluentUITheme } from "@rjsf/fluent-ui";
import { CheckCircleOutlined } from "@ant-design/icons";
import { AdditionalInputSchema } from "./ImplAdditionalInput.container";
import ErrorAlert from "../../layout/ErrorAlert";

interface ImplAdditionalInputSectionProps {
  additionalInputSchema: AdditionalInputSchema;
  setImplAdditionalInput: (name: string, data: any) => void;
  isLoading: boolean;
  error?: Error;
}

function ImplAdditionalInputSection({
  additionalInputSchema,
  setImplAdditionalInput,
  isLoading,
  error,
}: ImplAdditionalInputSectionProps) {
  const [formData, setFormData] = React.useState(null);
  const [visible, setVisible] = useState(false);

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const Form = withTheme(FluentUITheme);
  const onSuccessSubmit = ({ formData }: ISubmitEvent<any>) => {
    setImplAdditionalInput(additionalInputSchema.name, formData);
    setFormData(formData);
    setVisible(false);
  };

  return (
    <>
      <Button
        type="default"
        onClick={() => setVisible(true)}
        icon={formData ? <CheckCircleOutlined /> : null}
      >
        Provide "{additionalInputSchema.name}" input
      </Button>
      <Modal
        visible={visible}
        title={`The "${additionalInputSchema.name}"  additional input`}
        footer={null}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Form
          showErrorList={false}
          schema={additionalInputSchema.jsonSchema}
          formData={formData}
          onSubmit={onSuccessSubmit}
          liveValidate={true}
        >
          <div className="modal-footer">
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default ImplAdditionalInputSection;
