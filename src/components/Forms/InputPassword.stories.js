import InputPassword from "./InputPassword.svelte";

export default {
  title: "OmniaWrite/Components/Forms/InputPassword",
  component: InputPassword,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    placeholder: { control: "text" },
    autocomplete: { control: { type: "inline-radio", options: ["on", "off"] } },
  },
};

const Template = ({ ...args }) => ({
  Component: InputPassword,
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

export const Weak = Template.bind({});
Weak.args = {
  label: "Label",
  value: "1",
  helper: "Helper",
};

export const Medium = Template.bind({});
Medium.args = {
  label: "Label",
  value: "abcd1234",
  helper: "Helper",
};

export const Strong = Template.bind({});
Strong.args = {
  label: "Label",
  value: "AbCd123$",
  helper: "Helper",
};
