import React from "react";
import { useTypeInstanceQuery } from "../generated/graphql";
import TypeInstanceDetails from "./TypeInstanceDetails";

export interface TypeInstanceDetailsState {
  typeInstanceID: string;
  visible: boolean;
}

interface TypeInstanceDetailsContainerProps {
  state: TypeInstanceDetailsState;
  hideFn: () => void;
}

function TypeInstanceDetailsContainer({
  state,
  hideFn,
}: TypeInstanceDetailsContainerProps) {
  const { data, error, isLoading } = useTypeInstanceQuery({
    typeInstanceID: state.typeInstanceID,
  });

  return (
    <TypeInstanceDetails
      data={data}
      error={error as Error}
      isLoading={isLoading}
      visible={state.visible}
      hideFn={hideFn}
    />
  );
}

export default TypeInstanceDetailsContainer;
