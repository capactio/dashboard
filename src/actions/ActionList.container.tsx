import React from "react";

import { useActionListQuery } from "../generated/graphql";

import ActionList from "./ActionList";

function ActionListContainer() {
  const query = useActionListQuery();

  const rawData = query.data?.actions ?? [];
  const data = rawData.map((item) => {
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
