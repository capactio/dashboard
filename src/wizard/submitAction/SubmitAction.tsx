import React from "react";
import { Button } from "antd";

interface SubmitActionProps {
  isLoading: boolean;
  submitFn: () => void;
}

function SubmitAction({ isLoading, submitFn }: SubmitActionProps) {
  return (
    <Button type="primary" onClick={submitFn} loading={isLoading}>
      Submit
    </Button>
  );
}

export default SubmitAction;
