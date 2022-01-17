import React, { useState } from "react";
import CenteredSpinner from "../../layout/CenteredSpinner";
import ErrorAlert from "../../layout/ErrorAlert";
import { InputParameter } from "../../generated/graphql";
import { InputCollectionObj } from "../Wizard.container";
import "./InputParameters.css";
import InputParametersFormContainer from "./InputParametersForm.container";
import Tabbing, { Tab } from "../Tabbing";
import { FormButton } from "./InputParametersForm";
import { message } from "antd";

interface InputParametersProps {
  setInputParameter: (name: string, data: string) => void;
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

  const tabs: Tab[] = inputParamsSchemas.map((item) => {
    const initData =
      initInputParametersData && initInputParametersData[item.name];

    const getFirstNotSetItemIdx = () => {
      return inputParamsSchemas.findIndex((item) => {
        const initData =
          initInputParametersData && initInputParametersData[item.name];
        return !initData;
      });
    };

    const onSuccessSubmit = (data: string) => {
      setInputParameter(item.name, data);
      if (inputParamsSchemas.length > 1) {
        message.success(
          `The '${item.name}' input parameters have been saved successfully`
        );
      }
      if (current + 1 >= inputParamsSchemas.length) {
        const idx = getFirstNotSetItemIdx();
        if (idx === -1) {
          // everything already set, do nothing
          return;
        }

        setCurrent(idx);
      } else {
        setCurrent(current + 1);
      }
    };

    const formButton: FormButton =
      inputParamsSchemas.length === 1
        ? { label: "Next", className: "form-submit-btn" }
        : { label: "Save", className: "form-save-btn" };

    return {
      name: item.name,
      showCheckmarkIcon: Boolean(initData),
      content: (
        <InputParametersFormContainer
          initData={initData}
          formButton={formButton}
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
