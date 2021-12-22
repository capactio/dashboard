import React from "react";
import { FormProps, withTheme } from "@rjsf/core";

import ObjectFieldTemplate from "./form/ObjectFieldTemplate";
import TitleField from "./form/TitleField";

import "./Form.css";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Theme } = require("@rjsf/antd");
Theme.ObjectFieldTemplate = ObjectFieldTemplate;

const JSONSchemaForm = withTheme(Theme);

const formClassName = "json-schema-form";

const customFields = {
  TitleField: TitleField,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Form(props: FormProps<any>) {
  const classNames = [formClassName];
  if (props.className) {
    classNames.push(props.className);
  }

  const extendedProps = {
    ...props,
    className: classNames.join(" "),
    fields: customFields,
  };

  return <JSONSchemaForm {...extendedProps} />;
}

export default Form;
