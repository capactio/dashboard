import React from "react";
import SubmitAction from "./SubmitAction";
import { StepComponentProps } from "../Wizard.container";
import { useCreateActionWithInputMutation } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { createActionInput } from "./CreateAction";

interface InputParametersContainerProps extends StepComponentProps {}

function SubmitActionContainer({
  wizardData = {},
}: InputParametersContainerProps) {
  const { mutateAsync, isLoading } = useCreateActionWithInputMutation();
  const navigate = useNavigate();

  const submitFn = async () => {
    try {
      const input = createActionInput(wizardData);
      const data = await mutateAsync(input);
      message.success(
        `Action '${data?.createAction.name}' created successfully`
      );
      navigate(`/actions/${data?.createAction.name}`);
    } catch (error) {
      message.error(`Failed to submit Action. Got error: ${error}`);
    }
  };

  return <SubmitAction submitFn={submitFn} isLoading={isLoading} />;
}

export default SubmitActionContainer;
