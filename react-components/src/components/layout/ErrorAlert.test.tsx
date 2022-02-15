import React from "react";
import { render } from "@testing-library/react";

import ErrorAlert from "./ErrorAlert";

describe("ErrorAlert", () => {
  test("renders the ErrorAlert component", () => {
    render(<ErrorAlert errorMessage="foo" />);
  });
});
