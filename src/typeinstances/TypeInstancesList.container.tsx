import React, { useState } from "react";
import { Typography } from "antd";
import { ManifestReference } from "../generated/graphql";
import TypeInstancesList from "./TypeInstancesList";
import TypeInstanceDetailsContainer, {
  TypeInstanceDetailsState,
} from "./TypeInstanceDetails.container";

const { Text } = Typography;

export interface GenericTypeInstanceData {
  id: string;
  name?: string;
  typeRef?: ManifestReference;
}

interface TypeInstanceDetails {
  typeInstanceID?: string;
  visible: boolean;
}

interface TypeInstancesListContainerProps {
  data?: GenericTypeInstanceData[];
}

function TypeInstancesListContainer({ data }: TypeInstancesListContainerProps) {
  const [typeInstanceDetailsState, setTypeInstanceDetailsState] =
    useState<TypeInstanceDetails>({ visible: false });

  if (!data?.length) {
    return <Text>No TypeInstances</Text>;
  }

  const showTypeInstanceDetails = (typeInstanceID: string) => {
    setTypeInstanceDetailsState({
      visible: true,
      typeInstanceID,
    });
  };

  const hideTypeInstanceDetails = () => {
    setTypeInstanceDetailsState({
      ...typeInstanceDetailsState,
      visible: false,
    });
  };

  return (
    <>
      {typeInstanceDetailsState.typeInstanceID && (
        <TypeInstanceDetailsContainer
          state={typeInstanceDetailsState as TypeInstanceDetailsState}
          hideFn={hideTypeInstanceDetails}
        />
      )}
      <TypeInstancesList
        data={data}
        showTypeInstanceDetails={showTypeInstanceDetails}
      />
    </>
  );
}

export default TypeInstancesListContainer;
