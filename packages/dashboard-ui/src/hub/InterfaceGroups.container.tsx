import React from "react";
import InterfaceGroup from "./InterfaceGroup";
import {
  InterfaceGroup as InterfaceGroupGQL,
  useListInterfaceGroupsQuery,
} from "../generated/graphql";

function InterfaceGroupsContainer() {
  const { data, error, isLoading } = useListInterfaceGroupsQuery();

  const groups = (data?.interfaceGroups as InterfaceGroupGQL[]) ?? [];
  return (
    <InterfaceGroup
      interfaceGroups={groups}
      error={error as Error}
      isLoading={isLoading}
    />
  );
}

export default InterfaceGroupsContainer;
