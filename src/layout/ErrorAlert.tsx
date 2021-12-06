import React from "react";
import { Alert } from "antd";

import "./CenteredSpinner.css";

function ErrorAlert({
  error,
  errorMessage = "Unknown error. See the development tools console.",
}: {
  error?: Error;
  errorMessage?: string;
}) {
  let alertMessage = error ? `${error.name}: ${error.message}` : errorMessage;

  return (
    <div className="spinner-wrapper">
      <Alert message={alertMessage} type="error" />
    </div>
  );
}

export default ErrorAlert;
