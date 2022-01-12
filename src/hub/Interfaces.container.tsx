import React from "react";
import {
  InterfaceRevision,
  useListInterfacesFromInterfaceGroupQuery,
} from "../generated/graphql";
import InterfacesCard from "./InterfacesCard";
import { ResourceReference } from "../wizard/ResourceRef";
import InterfacesList from "./InterfacesList";
import { Result } from "antd";
import { Link } from "react-router-dom";
import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

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
  };

  switch (view) {
    case InterfacesView.Card:
      return <InterfacesCard {...props} />;
    case InterfacesView.List:
      return <InterfacesList {...props} />;
  }
}

export function interfaceActionsButtons(rev: InterfaceRevisionWithKey) {
  const btns = [
    <Link to={`/actions/new/${rev?.metadata.path}/${rev?.revision}`}>
      <PlusCircleOutlined /> Create Action
    </Link>,
  ];
  if (rev?.metadata.documentationURL) {
    btns.unshift(
      <a
        href={rev.metadata.documentationURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <InfoCircleOutlined /> Documentation
      </a>
    );
  }
  return btns;
}

export default InterfacesContainer;
