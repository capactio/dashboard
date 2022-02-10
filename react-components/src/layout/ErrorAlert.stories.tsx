import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ErrorAlert } from "./ErrorAlert";

export default {
  component: ErrorAlert,
} as ComponentMeta<typeof ErrorAlert>;

const Template: ComponentStory<typeof ErrorAlert> = (args) => (
  <ErrorAlert {...args} />
);

export const StringMessage = Template.bind({});
StringMessage.args = {
  errorMessage: "Test",
};

export const ErrorObject = Template.bind({});
ErrorObject.args = {
  error: new Error("Error"),
};
