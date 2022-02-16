import React from "react";

import { useActionListQuery } from "../generated/graphql";

import { ActionList, ActionItem } from "./ActionList";

export interface ActionListContainerProps {
  refetchInterval?: number;
  onActionClick: (name: string) => void;
}

export function ActionListContainer({
  refetchInterval,
  onActionClick,
}: ActionListContainerProps) {
  const query = useActionListQuery(undefined, {
    refetchInterval,
  });

  const rawData = query.data?.actions ?? [];
  const data: ActionItem[] = rawData.map((item) => {
    const actionRef = `${item.actionRef?.path}:${item.actionRef?.revision}`;
    return {
      key: item.name,
      name: item.name,
      actionRef,
      createdAt: item.createdAt,
      status: item.status?.phase,
    };
  });

  return (
    <ActionList
      onActionClick={onActionClick}
      data={data}
      error={query.error as Error | undefined}
      isLoading={query.isLoading}
    />
  );
}
