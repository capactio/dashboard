// COPIED from https://github.com/rjsf-team/react-jsonschema-form/blob/23937978b46ac8373994851d99914be83e6969b7/packages/antd/src/fields/TitleField/index.js

import React from "react";
import classNames from "classnames";

import { withConfigConsumer } from "antd/lib/config-provider/context";

const TitleField = ({
  // autofocus,
  // disabled,
  // errorSchema,
  formContext,
  // formData,
  id,
  // idSchema,
  // name,
  // onChange,
  prefixCls,
  // readonly,
  // registry,
  required,
  // schema,
  title,
  // uiSchema,
  additionalClassName,
}) => {
  const { colon = true } = formContext;

  let labelChildren = title;
  if (colon && typeof title === "string" && title.trim() !== "") {
    labelChildren = title.replace(/[：:]\s*$/, "");
  }

  const labelClassName = classNames(
    {
      [`${prefixCls}-item-required`]: required,
      [`${prefixCls}-item-no-colon`]: !colon,
    },
    additionalClassName
  );

  const handleLabelClick = () => {
    if (!id) {
      return;
    }

    const control = document.querySelector(`[id="${id}"]`);
    if (control && control.focus) {
      control.focus();
    }
  };

  return title ? (
    <label
      className={labelClassName}
      htmlFor={id}
      onClick={handleLabelClick}
      title={typeof title === "string" ? title : ""}
    >
      {labelChildren}
    </label>
  ) : null;
};

TitleField.defaultProps = {
  formContext: {},
};

export default withConfigConsumer({ prefixCls: "form" })(TitleField);
