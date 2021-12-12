import React from "react";
import SubmitAction from "./SubmitAction";
import {
  InputCollectionObj,
  StepComponentProps,
  WizardData,
} from "../Wizard.container";
import {
  CreateActionWithInputMutationVariables,
  PolicyInput,
  RulesForInterfaceInput,
  useCreateActionWithInputMutation,
} from "../../generated/graphql";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

interface InputParametersContainerProps extends StepComponentProps {}

function SubmitActionContainer({ wizardData }: InputParametersContainerProps) {
  const createActionWithInput = useCreateActionWithInputMutation();
  const { mutateAsync, isLoading } = createActionWithInput;
  const navigate = useNavigate();

  const submitFn = async () => {
    try {
      const input = actionCreateArgs(wizardData!);
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

function actionCreateArgs(
  wizardData: WizardData
): CreateActionWithInputMutationVariables {
  const out = {
    input: {
      // TODO(https://github.com/capactio/backlog/issues/32): human-friendly names.
      name: "act-" + (Math.random() + 1).toString(36).substring(7),
      advancedRendering: false,
      dryRun: false,
      actionRef: {
        path: wizardData.actionInterface!.metadata.path,
        revision: wizardData.actionInterface!.revision,
      },
    },
  } as CreateActionWithInputMutationVariables;

  const inputTIs = renderTypeInstances(wizardData);
  const inputParams = renderParams(wizardData);
  const policy = renderPolicy(wizardData);
  if (!inputTIs && !inputParams && !policy) {
    return out;
  }

  out.input.input = {};

  if (inputParams) {
    out.input.input.parameters = inputParams;
  }
  if (inputTIs) {
    out.input.input.typeInstances = inputTIs;
  }
  if (policy) {
    out.input.input.actionPolicy = policy;
  }

  return out;
}

function renderParams({ actionInputParameters: p }: WizardData) {
  return p ? JSON.stringify(p) : undefined;
}

function renderTypeInstances({ actionInputTypeInstances: ti }: WizardData) {
  if (!ti) {
    return undefined;
  }
  return Object.keys(ti).map((key) => ({
    name: key,
    id: ti[key],
  }));
}

function renderPolicy({
  actionInterface,
  actionImplPath,
  actionImplAdditionalInput,
}: WizardData): PolicyInput | undefined {
  if (!actionImplPath || !actionInterface) {
    return undefined;
  }

  return {
    rules: [
      specificImplRule(
        actionInterface.metadata.path,
        actionImplPath,
        actionImplAdditionalInput
      ),
      anyKubernetesImplRule(),
    ],
  };
}

function anyKubernetesImplRule(): RulesForInterfaceInput {
  return {
    interface: { path: "cap.*" },
    oneOf: [
      {
        implementationConstraints: {
          requires: [{ path: "cap.core.type.platform.kubernetes" }],
        },
      },
    ],
  };
}

function specificImplRule(
  ifacePath: string,
  implPath: string,
  inputs?: InputCollectionObj
): RulesForInterfaceInput {
  const rule: RulesForInterfaceInput = {
    interface: {
      path: ifacePath,
    },
    oneOf: [
      {
        implementationConstraints: {
          path: implPath,
        },
        inject: {
          // TODO(https://github.com/capactio/backlog/issues/32): requiredTypeInstances
          additionalParameters: [],
        },
      },
    ],
  };

  if (inputs) {
    rule.oneOf[0].inject!.additionalParameters! = Object.keys(inputs).map(
      (key) => ({
        name: key,
        value: inputs[key],
      })
    );
  }

  return rule;
}

export default SubmitActionContainer;
