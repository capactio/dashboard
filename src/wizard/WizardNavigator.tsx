import React from "react";
import "./Wizard.css";
import { Button, Layout, Steps } from "antd";
import CenteredSpinner from "../layout/CenteredSpinner";

interface WizardNavigatorProps {
  previousStepFn: () => void;
  nextStepFn: () => void;
  canProceed: boolean;
  isLoading: boolean;
}

function WizardNavigator({
  canProceed,
  previousStepFn,
  nextStepFn,
  isLoading,
}: WizardNavigatorProps) {
  if (isLoading) {
    return <CenteredSpinner />;
  }

  return (
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
      {currentStepIndex < steps.length - 1 && (
        <Button type="primary" onClick={nextStepFn} disabled={!canProceed}>
          Next
        </Button>
      )}
    </div>
  );
}

export default WizardNavigator;
