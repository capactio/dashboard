import React from "react";
import "./Wizard.css";
import { Button, Layout, Steps } from "antd";
import { WizardSteps } from "./Wizard.container";
import { CenteredSpinner, ErrorAlert } from "../layout";

const { Step } = Steps;
const { Content } = Layout;

export interface WizardProps {
  steps: WizardSteps;
  currentStepIndex: number;
  previousStepFn: () => void;
  nextStepFn: () => void;
  canProceed: boolean;
  isNextBtnTakenOver: boolean;
  error?: Error;
  isLoading: boolean;
}

export function Wizard({
  steps,
  currentStepIndex,
  canProceed,
  previousStepFn,
  nextStepFn,
  isNextBtnTakenOver,
  isLoading,
  error,
}: WizardProps) {
  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <Content className="wizard-content">
      <Steps className="steps-indicator" current={currentStepIndex}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStepIndex].content}</div>
      <div className="steps-action">
        {currentStepIndex > 0 && (
          <Button
            type="default"
            style={{ margin: "0", float: "left" }}
            onClick={previousStepFn}
          >
            Previous
          </Button>
        )}
        {!isNextBtnTakenOver && currentStepIndex < steps.length - 1 && (
          <Button type="primary" onClick={nextStepFn} disabled={!canProceed}>
            Next
          </Button>
        )}
      </div>
    </Content>
  );
}
