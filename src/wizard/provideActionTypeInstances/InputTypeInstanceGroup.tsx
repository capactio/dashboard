import React from "react";
import { Col, Empty, Radio, Typography } from "antd";
import CenteredSpinner from "../../layout/CenteredSpinner";
import ErrorAlert from "../../layout/ErrorAlert";
import { TypeInstance } from "../../generated/graphql";

const { Text } = Typography;

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
        <Radio.Button
          className="huge-radio"
          key={id}
          disabled={lockedBy}
          value={id}
          onClick={() => setInputTypeInstanceID(id)}
        >
          {createdBy && <strong>Created by: {createdBy}</strong>}
          {lockedBy && <Text>Locked by: {lockedBy}</Text>}
          <p>{id}</p>
        </Radio.Button>
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
        <Col span={24} className="huge-radio-group">
          <Radio.Group
            size="large"
            buttonStyle="solid"
            value={inputTypeInstanceID}
          >
            {radioBtns}
          </Radio.Group>
        </Col>
      )}
    </>
  );
}

export default InputTypeInstanceGroup;
