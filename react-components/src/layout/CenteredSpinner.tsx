import React from "react";

import "./CenteredSpinner.css";

import { Spin } from "antd";

export function CenteredSpinner() {
  return (
    <div className="spinner-wrapper">
      <Spin />
    </div>
  );
}
