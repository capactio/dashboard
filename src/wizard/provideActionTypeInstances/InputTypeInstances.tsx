import React, { useState } from "react";
import { Empty } from "antd";
import CenteredSpinner from "../../layout/CenteredSpinner";
import { InputTypeInstance } from "../../generated/graphql";
import { CheckCircleOutlined } from "@ant-design/icons";
import InputParametersFromTypeSectionContainer from "./InputTypeInstanceGroup.container";
import { InputCollectionObj } from "../Wizard.container";
import Tabbing, { Tab } from "../Tabbing";

interface InputParametersProps {
  setInputTypeInstance: (name: string, data: any) => void;
  inputTypeInstances?: InputCollectionObj;
  isLoading: boolean;
  inputTypeInstancesRefs: InputTypeInstance[];
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

  const getFirstNotSetItemIdx = () => {
    return inputTypeInstancesRefs.findIndex((item) => {
      const initData = inputTypeInstances && inputTypeInstances[item.name];
      return !initData;
    });
  };

  const tabs: Tab[] = inputTypeInstancesRefs.map((item) => {
    const initData = inputTypeInstances && inputTypeInstances[item.name];
    const onSuccessSubmit = (data: string) => {
      setInputTypeInstance(item.name, data);
      if (current + 1 >= inputTypeInstancesRefs.length) {
        setCurrent(getFirstNotSetItemIdx());
      } else {
        setCurrent(current + 1);
      }
    };

    return {
      name: item.name,
      showCheckmarkIcon: Boolean(initData),
      content: (
        <InputParametersFromTypeSectionContainer
          key={item.name}
          typeRef={item.typeRef}
          inputTypeInstanceID={initData}
          setInputTypeInstanceID={onSuccessSubmit}
        />
      ),
    };
  });

  return (
    <Tabbing setCurrentIdx={setCurrent} currentIdx={current} data={tabs} />
  );
}

export default InputTypeInstances;
