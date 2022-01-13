import React from "react";
import { Col, Empty, Radio, Row, Space } from "antd";
import CenteredSpinner from "../../layout/CenteredSpinner";
import ErrorAlert from "../../layout/ErrorAlert";
import { TypeInstance } from "../../generated/graphql";

interface InputTypeInstanceGroupProps {
  isLoading: boolean;
  name: string;
  error?: Error;
  typeInstances: TypeInstance[];
  setInputTypeInstanceID: (data: string) => void;
  inputTypeInstanceID: string;
}

function InputTypeInstanceGroup({
  isLoading,
  error,
  name,
  typeInstances,
  setInputTypeInstanceID,
  inputTypeInstanceID,
}: InputTypeInstanceGroupProps) {
  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const radioBtns = typeInstances.map(
    ({ id, lockedBy, latestResourceVersion }) => {
      const createdBy = latestResourceVersion?.createdBy;
      return (
        <Radio
          key={id}
          disabled={lockedBy}
          value={id}
          onClick={() => setInputTypeInstanceID(id)}
        >
          <strong>{id}</strong>
          {createdBy && <p>Created by: {createdBy}</p>}
          {lockedBy && <p>Locked by: {lockedBy}</p>}
        </Radio>
      );
    }
  );

  return (
    <>
      {radioBtns.length === 0 && (
        <Empty
          imageStyle={{
            fontSize: "60px",
          }}
          description={
            <span>
              Couldn't find TypeInstance for <strong>{name}</strong>.
            </span>
          }
        />
      )}

      {radioBtns.length > 0 && (
        <Row>
          <Col span={24} className="huge-radio-group">
            <Radio.Group value={inputTypeInstanceID}>
              <Space direction="vertical">{radioBtns}</Space>
            </Radio.Group>
          </Col>
        </Row>
      )}
    </>
  );
}

export default InputTypeInstanceGroup;
