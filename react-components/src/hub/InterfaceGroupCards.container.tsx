import React from "react";
import { InterfaceGroupCards } from "./InterfaceGroupCards";
import {
  InterfaceGroup as InterfaceGroupGQL,
  useListInterfaceGroupsQuery,
} from "../generated/graphql";

export interface InterfaceGroupCardsContainerProps {
  onInterfaceGroupClick: (interfaceGroupPath: string) => void;
}

export function InterfaceGroupCardsContainer({
  onInterfaceGroupClick,
}: InterfaceGroupCardsContainerProps) {
  const { data, error, isLoading } = useListInterfaceGroupsQuery();

  const groups = (data?.interfaceGroups as InterfaceGroupGQL[]) ?? [];
  return (
    <InterfaceGroupCards
      onInterfaceGroupClick={onInterfaceGroupClick}
      interfaceGroups={groups}
      error={error as Error}
      isLoading={isLoading}
    />
  );
}
