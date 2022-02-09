import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ErrorAlert from "./ErrorAlert";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: ErrorAlert,
} as ComponentMeta<typeof ErrorAlert>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ErrorAlert> = (args) => (
  <ErrorAlert {...args} />
);

export const StringMessage = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
StringMessage.args = {
  errorMessage: "Test",
};

export const ErrorObject = Template.bind({});
ErrorObject.args = {
  error: new Error("Error"),
};
