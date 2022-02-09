import React from "react";

import "./CenteredSpinner.css";

import { Spin } from "antd";

function CenteredSpinner() {
  return (
    <div className="spinner-wrapper">
      <Spin />
    </div>
  );
}

export default CenteredSpinner;
