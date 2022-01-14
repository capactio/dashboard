import { InputCollectionObj, WizardData } from "../Wizard.container";
import {
  CreateActionWithInputMutationVariables,
  InterfaceRevision,
  PolicyInput,
  RulesForInterfaceInput,
} from "../../generated/graphql";
import { AdvancedModeInput } from "./ActionOverview.container";

export function createActionGQLInput(
  wizardData: WizardData,
  advancedInput: AdvancedModeInput
): CreateActionWithInputMutationVariables {
  const out = {
    input: {
      name: advancedInput.actionName.toLocaleLowerCase(),
      advancedRendering: false,
      dryRun: false,
      actionRef: {
        path: wizardData.actionInterface?.metadata.path,
        revision: wizardData.actionInterface?.revision,
      },
    },
  } as CreateActionWithInputMutationVariables;

  const inputTIs = renderTypeInstances(wizardData);
  const inputParams = renderParams(wizardData);
  const policy = renderPolicy(wizardData.actionInterface, advancedInput);
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
  return p && JSON.stringify(p);
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

function renderPolicy(
  actionInterface: InterfaceRevision | undefined,
  advancedInput: AdvancedModeInput
): PolicyInput | undefined {
  if (!actionInterface || !advancedInput.actionImplPath) {
    return undefined;
  }

  return {
    rules: [
      getSpecificImplRule(
        actionInterface.metadata.path,
        advancedInput.actionImplPath,
        advancedInput.actionImplAdditionalInput
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

function getSpecificImplRule(
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
