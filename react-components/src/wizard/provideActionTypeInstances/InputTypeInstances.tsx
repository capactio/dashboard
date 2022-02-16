import React, { useState } from "react";
import { CenteredSpinner } from "../../layout/CenteredSpinner";
import { InputTypeInstance } from "../../generated/graphql";
import { InputTypeInstanceGroupContainer } from "./InputTypeInstanceGroup.container";
import { InputCollectionObj } from "../Wizard.container";
import { Tabbing, Tab } from "../Tabbing";

export interface InputTypeInstancesProps {
  setInputTypeInstance: (name: string, data: string) => void;
  inputTypeInstances?: InputCollectionObj;
  isLoading: boolean;
  inputTypeInstancesRefs: InputTypeInstance[];
}

export function InputTypeInstances({
  isLoading,
  inputTypeInstancesRefs,
  setInputTypeInstance,
  inputTypeInstances,
}: InputTypeInstancesProps) {
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

    return {
      name: item.name,
      showCheckmarkIcon: Boolean(initData),
      content: (
        <InputTypeInstanceGroupContainer
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
