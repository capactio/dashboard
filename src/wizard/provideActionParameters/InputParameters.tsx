import React, { useState } from "react";
import { Empty } from "antd";
import CenteredSpinner from "../../layout/CenteredSpinner";
import ErrorAlert from "../../layout/ErrorAlert";
import { InputParameter } from "../../generated/graphql";
import { CheckCircleOutlined } from "@ant-design/icons";
import { InputCollectionObj } from "../Wizard.container";
import "./InputParameters.css";
import InputParametersFormContainer from "./InputParametersForm.container";
import Tabbing, { Tab } from "../Tabbing";

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

  inputParamsSchemas = [...inputParamsSchemas, ...inputParamsSchemas];

  const tabs: Tab[] = inputParamsSchemas.map((item) => {
    const initData =
      initInputParametersData && initInputParametersData[item.name];

    const getFirstNotSetItemIdx = () => {
      return inputParamsSchemas.findIndex((item, idx) => {
        const initData =
          initInputParametersData && initInputParametersData[item.name];
        return !initData;
      });
    };

    const onSuccessSubmit = (data: any) => {
      setInputParameter(item.name, data);
      if (current + 1 >= inputParamsSchemas.length) {
        setCurrent(getFirstNotSetItemIdx());
      } else {
        setCurrent(current + 1);
      }
    };

    return {
      name: item.name,
      showCheckmarkIcon: Boolean(initData),
      content: (
        <InputParametersFormContainer
          initData={initData}
          name={item.name}
          typeRef={item.typeRef}
          rawJSONSchema={item.jsonSchema}
          onSuccessSubmit={onSuccessSubmit}
        />
      ),
    };
  });

  return (
    <Tabbing setCurrentIdx={setCurrent} currentIdx={current} data={tabs} />
  );
}

export default InputParameters;
