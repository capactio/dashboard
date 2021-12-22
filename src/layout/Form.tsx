import React from "react";
import { FormProps, withTheme } from "@rjsf/core";

import "./Form.css";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Theme } = require("@rjsf/antd");

const JSONSchemaForm = withTheme(Theme);

const formClassName = "json-schema-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Form(props: FormProps<any>) {
  const classNames = [formClassName];
  if (props.className) {
    classNames.push(props.className);
  }

  const extendedProps = {
    ...props,
    className: classNames.join(" "),
  };

  return <JSONSchemaForm {...extendedProps} />;
}

export default Form;
