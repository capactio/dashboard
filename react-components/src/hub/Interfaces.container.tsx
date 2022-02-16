import React from "react";
import { useListInterfacesFromInterfaceGroupQuery } from "../generated/graphql";
import { InterfacesCard } from "./InterfacesCard";
import { ResourceReference } from "../wizard/ResourceRef";
import { InterfacesList } from "./InterfacesList";
import { Result } from "antd";
import { InterfaceRevisionWithKey } from ".";

export enum InterfacesView {
  Card,
  List,
}

export interface InterfacesContainerProps {
  path: string;
  view: InterfacesView;
  onInterfaceClick: (path: string, revision: string) => void;
}

export function InterfacesContainer({
  path,
  view,
  onInterfaceClick,
}: InterfacesContainerProps) {
  const { data, error, isLoading } = useListInterfacesFromInterfaceGroupQuery({
    path: path,
  });

  if (!isLoading && (!data || !data.interfaceGroup)) {
    return (
      <Result
        status="404"
        title="404"
        subTitle={
          <>
            Sorry, <b>{path}</b> InterfaceGroup was not found in Hub.
          </>
        }
      />
    );
  }

  const ifaces = data?.interfaceGroup?.interfaces.map(
    ({ latestRevision: rev }) => {
      return {
        ...rev,
        key: new ResourceReference(rev?.metadata.path, rev?.revision).key(),
      } as InterfaceRevisionWithKey;
    }
  );

  const props = {
    interfaces: ifaces,
    error: error as Error,
    isLoading: isLoading,
    onInterfaceClick,
  };

  switch (view) {
    case InterfacesView.Card:
      return <InterfacesCard {...props} />;
    case InterfacesView.List:
      return <InterfacesList {...props} />;
  }
}
