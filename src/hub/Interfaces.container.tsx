import React from "react";
import {
  InterfaceRevision,
  useListInterfacesFromInterfaceGroupQuery,
} from "../generated/graphql";
import InterfacesCard from "./InterfacesCard";
import { ResourceReference } from "../wizard/ResourceRef";
import InterfacesList from "./InterfacesList";

export enum InterfacesView {
  Card,
  List,
}

export interface InterfaceRevisionWithKey extends InterfaceRevision {
  key: string;
}

interface InterfacesContainerProps {
  path: string;
  view: InterfacesView;
}

function InterfacesContainer({ path, view }: InterfacesContainerProps) {
  const { data, error, isLoading } = useListInterfacesFromInterfaceGroupQuery({
    path: path,
  });

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
  };

  switch (view) {
    case InterfacesView.Card:
      return <InterfacesCard {...props} />;
    case InterfacesView.List:
      return <InterfacesList {...props} />;
  }
}

export default InterfacesContainer;
