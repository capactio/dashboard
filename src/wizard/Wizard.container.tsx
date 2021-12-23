import React from "react";
import "./Wizard.css";
import Wizard from "./Wizard";
import SelectActionImplContainer from "./selectActionImplementation/SelectActionImpl.container";
import {
  InterfaceRevision,
  useListInterfaceRevisionQuery,
} from "../generated/graphql";
import InputParametersContainer from "./provideActionParameters/InputParameters.container";
import InputTypeInstancesContainer from "./provideActionTypeInstances/InputTypeInstances.container";
import SubmitActionContainer from "./submitAction/SubmitAction.container";

export type InputCollectionObj = { [key: string]: any };

export interface WizardData {
  // action - simple mode
  actionInterface?: InterfaceRevision;
  actionInputParameters?: InputCollectionObj;
  actionInputTypeInstances?: InputCollectionObj;

  // policy - advanced mode
  actionImplAdditionalInput?: InputCollectionObj;
  actionImplPath?: string;
}

export type WizardSteps = {
  title: string;
  content: StepComponent;

  // TODO(https://github.com/capactio/backlog/issues/32): Logic associated with buttons will be moved to proper containers.
  canProceed: (data: WizardData) => boolean;
  replaceNextBtn: (data: WizardData) => boolean;
}[];

export type StepComponent = React.ReactElement<StepComponentProps>;

export interface StepComponentProps {
  wizardData: WizardData;
  setWizardData: (data: WizardData) => void;
}

interface WizardContainerProps {
  interfacePath: string;
  interfaceRevision: string;
}

function WizardContainer({
  interfacePath,
  interfaceRevision,
}: WizardContainerProps) {
  const [currentStepIdx, setCurrentStep] = React.useState(0);
  const [wizardData, setWizardData] = React.useState<WizardData>(
    {} as WizardData
  );

  const { data, error, isLoading } = useListInterfaceRevisionQuery({
    path: interfacePath,
    revision: interfaceRevision,
  });

  const actionInterface = data?.interface?.revision as InterfaceRevision;
  if (actionInterface && actionInterface !== wizardData.actionInterface) {
    setWizardData({
      ...wizardData,
      actionInterface,
    } as WizardData);
  }

  const stepProps = { wizardData, setWizardData };
  const steps = collectRequiredSteps(stepProps);
  const canProceed = steps[currentStepIdx].canProceed(wizardData);
  const takeOverNextBtn = steps[currentStepIdx].replaceNextBtn(wizardData);

  const nextStep = () => {
    setCurrentStep(currentStepIdx + 1);
  };

  const previousStep = () => {
    setCurrentStep(currentStepIdx - 1);
  };

  return (
    <Wizard
      isLoading={isLoading}
      error={error as Error}
      steps={steps}
      currentStepIndex={currentStepIdx}
      canProceed={canProceed}
      nextStepFn={nextStep}
      previousStepFn={previousStep}
      isNextBtnTakenOver={takeOverNextBtn}
      submitBtn={<SubmitActionContainer {...stepProps} />}
    />
  );
}

function collectRequiredSteps(stepProps: StepComponentProps) {
  const steps: WizardSteps = [];
  const actionInput = stepProps.wizardData?.actionInterface?.spec.input;

  if (actionInput?.parameters.length) {
    steps.push({
      title: "Input parameters",
      content: <InputParametersContainer {...stepProps} />,
      canProceed: (data) => {
        const { requiredLen, submittedLen } = requiredAddSubmittedParams(
          stepProps.wizardData ?? {}
        );
        return requiredLen === 0 || submittedLen === requiredLen;
      },
      replaceNextBtn: (data) => {
        const { requiredLen, submittedLen } = requiredAddSubmittedParams(
          stepProps.wizardData
        );
        return requiredLen > 0 && submittedLen < requiredLen;
      },
    });
  }

  if (actionInput?.typeInstances.length) {
    steps.push({
      title: "Input TypeInstances",
      content: <InputTypeInstancesContainer {...stepProps} />,
      canProceed: (data) => {
        const { requiredLen, selectedLen } = requiredAddSelectedTI(
          stepProps.wizardData
        );
        return requiredLen === 0 || selectedLen === requiredLen;
      },
      replaceNextBtn: () => false,
    });
  }

  steps.push({
    title: "Summary",
    content: <SelectActionImplContainer {...stepProps} />,
    canProceed: (data) => {
      return data.actionImplPath !== undefined;
    },
    replaceNextBtn: () => false,
  });

  return steps;
}

function requiredAddSubmittedParams({
  actionInterface,
  actionInputParameters,
}: WizardData) {
  const requiredLen = actionInterface?.spec.input.parameters?.length ?? 0;
  const submittedLen = Object.keys(actionInputParameters ?? {}).length;
  return { requiredLen, submittedLen };
}

function requiredAddSelectedTI({
  actionInterface,
  actionInputTypeInstances,
}: WizardData) {
  const requiredLen = actionInterface?.spec.input.typeInstances?.length ?? 0;
  const selectedLen = Object.keys(actionInputTypeInstances ?? {}).length;
  return { requiredLen, selectedLen };
}

export default WizardContainer;
