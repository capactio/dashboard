import React from "react";
import InterfaceGroup from "./InterfaceGroup";
import { useListInterfaceGroupsOnlyQuery } from "../generated/graphql";

function InterfaceGroupsContainer() {
  const { data, error, isLoading } = useListInterfaceGroupsOnlyQuery();

  return (
    <InterfaceGroup data={data} error={error as Error} isLoading={isLoading} />
  );
}

export default InterfaceGroupsContainer;
