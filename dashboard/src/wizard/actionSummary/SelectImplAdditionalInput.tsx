import React, { useState } from "react";
import CenteredSpinner from "../../layout/CenteredSpinner";
import { ISubmitEvent } from "@rjsf/core";
import { Button, Modal, Space } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { AdditionalInputSchema } from "./SelectImplAdditionalInput.container";
import { ErrorAlert } from "@capactio/react-components";
import Form from "../../layout/Form";
import Title from "antd/lib/typography/Title";

interface ImplAdditionalInputSectionProps {
  additionalInputSchema: AdditionalInputSchema;
  setImplAdditionalInput: (name: string, data: unknown) => void;
  resetImplAdditionalInput: (name: string) => void;
  isLoading: boolean;
  error?: Error;
}

function ImplAdditionalInputSection({
  additionalInputSchema,
  setImplAdditionalInput,
  resetImplAdditionalInput,
  isLoading,
  error,
}: ImplAdditionalInputSectionProps) {
  const [formData, setFormData] = useState<unknown>(null);
  const [visible, setVisible] = useState(false);

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const onSuccessSubmit = ({ formData }: ISubmitEvent<unknown>) => {
    setImplAdditionalInput(additionalInputSchema.name, formData);
    setFormData(formData);
    setVisible(false);
  };

  const resetData = () => {
    resetImplAdditionalInput(additionalInputSchema.name);
    setFormData(null);
  };

  return (
    <>
      <Title level={4}>
        {formData ? <CheckCircleOutlined /> : null} {additionalInputSchema.name}
      </Title>
      <Space size="middle">
        <Button type="default" onClick={() => setVisible(true)}>
          Provide input
        </Button>
        <Button
          disabled={!formData}
          type="default"
          danger
          onClick={() => resetData()}
        >
          Reset
        </Button>
      </Space>
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
