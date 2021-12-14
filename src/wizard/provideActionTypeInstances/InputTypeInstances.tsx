import React, { useState } from "react";
import { Empty } from "antd";
import CenteredSpinner from "../../layout/CenteredSpinner";
import { InputTypeInstance } from "../../generated/graphql";
import { CheckCircleOutlined } from "@ant-design/icons";
import InputParametersFromTypeSectionContainer from "./InputTypeInstanceGroup.container";
import { InputCollectionObj } from "../Wizard.container";
import Tabbing from "../Tabbing";

interface InputParametersProps {
  setInputTypeInstance: (name: string, data: any) => void;
  inputTypeInstances?: InputCollectionObj;
  isLoading: boolean;
  inputTypeInstancesRefs: InputTypeInstance[];
}

interface InputTypeInstanceWithInit extends InputTypeInstance {
  initData?: any;
}

function InputTypeInstances({
  isLoading,
  inputTypeInstancesRefs,
  setInputTypeInstance,
  inputTypeInstances,
}: InputParametersProps) {
  const [current, setCurrent] = useState(0);

  if (isLoading) {
    return <CenteredSpinner />;
  }

  const data = inputTypeInstancesRefs.map((item) => {
    const initData = inputTypeInstances && inputTypeInstances[item.name];
    return {
      ...item,
      initData,
    };
  });

  const renderContent = (input: InputTypeInstanceWithInit) => {
    const onSuccessSubmit = (data: string) => {
      setInputTypeInstance(input.name, data);
      setCurrent(current + 1);
    };
    return (
      <InputParametersFromTypeSectionContainer
        key={input.name}
        typeRef={input.typeRef}
        inputTypeInstanceID={input.initData}
        setInputTypeInstanceID={onSuccessSubmit}
      />
    );
  };

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
      {!wasAllDataProvided && (
        <Tabbing
          setCurrentIdx={setCurrent}
          renderContent={renderContent}
          currentIdx={current}
          data={data}
          satisfiedNameTuple={(data: InputTypeInstanceWithInit) => {
            return [data.initData, data.name];
          }}
        />
      )}
    </>
  );
}

export default InputTypeInstances;
