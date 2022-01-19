import React from "react";
import { loadRuntimeConfig } from "../config/runtime";

import { useActionListQuery } from "../generated/graphql";

import ActionList, { ActionItem } from "./ActionList";

function ActionListContainer() {
  const { queryRefetchIntervalMS } = loadRuntimeConfig();
  const query = useActionListQuery(undefined, {
    refetchInterval: queryRefetchIntervalMS,
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
      data={data}
      error={query.error as Error | undefined}
      isLoading={query.isLoading}
    />
  );
}

export default ActionListContainer;
