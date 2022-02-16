import React from "react";
import { Alert } from "antd";

export function ErrorAlert({
  error,
  errorMessage = "Unknown error. See the development tools console.",
}: {
  error?: Error;
  errorMessage?: string;
}) {
  const alertMessage = error ? `${error.name}: ${error.message}` : errorMessage;

  return (
    <div className="spinner-wrapper">
      <Alert className="error-alert" message={alertMessage} type="error" />
    </div>
  );
}
