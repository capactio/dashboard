import React, { useState } from "react";
import { Col, Empty, Row, Steps } from "antd";
import CenteredSpinner from "../../layout/CenteredSpinner";
import { InputTypeInstance } from "../../generated/graphql";
import { CheckCircleOutlined } from "@ant-design/icons";
import InputParametersFromTypeSectionContainer from "./InputTypeInstanceGroup.container";

const { Step } = Steps;

interface InputParametersProps {
  setInputTypeInstance: (name: string, data: any) => void;
  isLoading: boolean;
  inputTypeInstancesRefs: InputTypeInstance[];
}

function InputTypeInstances({
  isLoading,
  inputTypeInstancesRefs,
  setInputTypeInstance,
}: InputParametersProps) {
  const [current, setCurrent] = useState(0);

  if (isLoading) {
    return <CenteredSpinner />;
  }

  const next = () => {
    setCurrent(current + 1);
  };

  const groups = inputTypeInstancesRefs.map(({ name, typeRef }) => {
    const onSuccessSubmit = (data: string) => {
      setInputTypeInstance(name, data);
      next();
    };

    return (
      <InputParametersFromTypeSectionContainer
        key={name}
        typeRef={typeRef}
        setInputTypeInstanceID={onSuccessSubmit}
      />
    );
  });

  const wasAllDataProvided = current === inputTypeInstancesRefs.length;
  const allDataProvidedMsg = inputTypeInstancesRefs.length
    ? "All TypeInstances were provided."
    : "Action does not require any input TypeInstances.";

  return (
    <>
      {wasAllDataProvided && (
        <Empty
          image={<CheckCircleOutlined />}
          imageStyle={{
            fontSize: "60px",
          }}
          description={<span>{allDataProvidedMsg}</span>}
        />
      )}
      {!wasAllDataProvided && inputTypeInstancesRefs.length === 1 && (
        <div>{groups[0]}</div>
      )}
      {!wasAllDataProvided && inputTypeInstancesRefs.length > 1 && (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={3}>
            {verticalStepper(inputTypeInstancesRefs, current)}
          </Col>
          <Col className="huge-radio-group" span={21}>
            {groups[current]}
          </Col>
        </Row>
      )}
    </>
  );
}

function verticalStepper(inputParams: InputTypeInstance[], current: number) {
  const steps = inputParams.map(({ name }) => {
    return <Step key={name} title={name} />;
  });

  return (
    <Steps key={current} current={current} direction="vertical">
      {steps}
    </Steps>
  );
}

export default InputTypeInstances;
