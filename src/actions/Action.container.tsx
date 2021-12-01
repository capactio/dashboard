import React from "react";

import Action from "./Action";

interface ActionContainerProps {
  name: string;
}

function ActionContainer({ name }: ActionContainerProps) {
  return <Action />;
}

export default ActionContainer;
