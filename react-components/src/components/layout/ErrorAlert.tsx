import React from "react";
import { Alert } from "antd";
import styled from "styled-components";

const StyledAlert = styled(Alert)`
  /* TODO: Just for testing purposes - remove it before merge */
  font-weight: bold;
  text-transform: uppercase;
`;

function ErrorAlert({
  error,
  errorMessage = "Unknown error. See the development tools console.",
}: {
  error?: Error;
  errorMessage?: string;
}) {
  const alertMessage = error ? `${error.name}: ${error.message}` : errorMessage;

  return (
    <div className="spinner-wrapper">
      <StyledAlert
        className="error-alert"
        message={alertMessage}
        type="error"
      />
    </div>
  );
}

export default ErrorAlert;
