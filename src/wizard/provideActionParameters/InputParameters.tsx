import React, { useState } from "react";
import { Empty } from "antd";
import CenteredSpinner from "../../layout/CenteredSpinner";
import ErrorAlert from "../../layout/ErrorAlert";
import { InputParameter } from "../../generated/graphql";
import { CheckCircleOutlined } from "@ant-design/icons";
import { InputCollectionObj } from "../Wizard.container";
import "./InputParameters.css";
import InputParametersFormContainer from "./InputParametersForm.container";
import Tabbing from "../Tabbing";

interface InputParametersProps {
  setInputParameter: (name: string, data: any) => void;
  isLoading: boolean;
  error?: Error;
  inputParamsSchemas: InputParameter[];
  initInputParametersData?: InputCollectionObj;
}

interface InputParameterWithInit extends InputParameter {
  initData?: any;
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

  const data: InputParameterWithInit[] = inputParamsSchemas.map((item) => {
    const initData =
      initInputParametersData && initInputParametersData[item.name];
    return {
      ...item,
      initData,
    };
  });

  const createForm = (input: InputParameterWithInit) => {
    const onSuccessSubmit = (data: any) => {
      setInputParameter(input.name, data);
      setCurrent(current + 1);
    };
    return (
      <InputParametersFormContainer
        initData={input.initData}
        name={input.name}
        typeRef={input.typeRef}
        rawJSONSchema={input.jsonSchema}
        onSuccessSubmit={onSuccessSubmit}
      />
    );
  };

  const wasAllDataProvided = current === data.length;
  const allDataProvidedMsg = data.length
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
      {!wasAllDataProvided && (
        <Tabbing
          setCurrentIdx={setCurrent}
          renderContent={createForm}
          currentIdx={current}
          data={data}
          satisfiedNameTuple={(data: InputParameterWithInit) => {
            return [data.initData, data.name];
          }}
        />
      )}
    </>
  );
}

export default InputParameters;
