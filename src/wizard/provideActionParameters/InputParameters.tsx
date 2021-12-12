import React, { useState } from "react";
import { Col, Empty, Row, Steps } from "antd";
import CenteredSpinner from "../../layout/CenteredSpinner";
import ErrorAlert from "../../layout/ErrorAlert";
import { InputParameter } from "../../generated/graphql";
import { CheckCircleOutlined } from "@ant-design/icons";
import InputParametersFromTypeSectionContainer from "./InputParametersFromType.container";
import InputParametersForm from "./InputParametersForm";
import { InputCollectionObj } from "../Wizard.container";
import "./InputParameters.css";
const { Step } = Steps;

interface InputParametersProps {
  setInputParameter: (name: string, data: any) => void;
  isLoading: boolean;
  error?: Error;
  inputParamsSchemas: InputParameter[];
  initInputParametersData?: InputCollectionObj;
}

function InputParameters({
  isLoading,
  error,
  inputParamsSchemas,
  initInputParametersData,
  setInputParameter,
}: InputParametersProps) {
  const [current, setCurrent] = useState(0);

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const next = () => {
    setCurrent(current + 1);
  };

  const forms = inputParamsSchemas.map(({ name, typeRef, jsonSchema }) => {
    const onSuccessSubmit = (data: any) => {
      setInputParameter(name, data);
      next();
    };

    const initData = initInputParametersData
      ? initInputParametersData[name]
      : undefined;
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

    return (
      <InputParametersForm
        key={name}
        initData={initData}
        isLoading={false}
        schema={jsonSchema}
        setInputParameter={onSuccessSubmit}
      />
    );
  });

  const wasAllDataProvided = current === inputParamsSchemas.length;
  const allDataProvidedMsg = inputParamsSchemas.length
    ? "All input parameters were provided."
    : "Action does not require any input parameters.";
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
      {!wasAllDataProvided && inputParamsSchemas.length === 1 && (
        <div>{forms[0]}</div>
      )}
      {!wasAllDataProvided && inputParamsSchemas.length > 1 && (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" flex="none">
            {verticalStepper(inputParamsSchemas, current)}
          </Col>
          <Col className="gutter-row position-static-col" flex="auto">
            {forms[current]}
          </Col>
        </Row>
      )}
    </>
  );
}

function verticalStepper(inputParams: InputParameter[], current: number) {
  const steps = inputParams.map(({ name }) => {
    return <Step title={name} />;
  });

  return (
    <Steps key={current} current={current} direction="vertical">
      {steps}
    </Steps>
  );
}

export default InputParameters;
