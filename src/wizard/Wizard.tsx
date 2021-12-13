import React from "react";
import "./Wizard.css";
import { Button, Steps } from "antd";
import { StepComponent, WizardSteps } from "./Wizard.container";

const { Step } = Steps;

interface WizardProps {
  steps: WizardSteps;
  currentStepIndex: number;
  previousStepFn: () => void;
  nextStepFn: () => void;
  canProceed: boolean;
  isNextBtnTakenOver: boolean;
  submitBtn: StepComponent;
}

function Wizard({
  steps,
  currentStepIndex,
  canProceed,
  previousStepFn,
  nextStepFn,
  submitBtn,
  isNextBtnTakenOver,
}: WizardProps) {
  return (
    <>
      <Steps current={currentStepIndex}>
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
        {currentStepIndex === steps.length - 1 && <div>{submitBtn}</div>}
      </div>
    </>
  );
}

export default Wizard;
