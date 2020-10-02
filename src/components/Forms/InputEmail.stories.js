import InputEmail from "./InputEmail.svelte";

export default {
  title: "OmniaWrite/Forms/InputEmail",
  component: InputEmail,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    placeholder: { control: "text" },
    helper: { control: "text" },
    autocomplete: { control: { type: "inline-radio", options: ["on", "off"] } },
  },
};

const Template = ({ ...args }) => ({
  Component: InputEmail,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  label: "Label",
  placeholder: "Placeholder",
};

export const WithHelper = Template.bind({});
WithHelper.args = {
  label: "Label",
  helper: "Helper",
};
