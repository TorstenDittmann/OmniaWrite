import Checkbox from "./Checkbox.svelte";

export default {
  title: "OmniaWrite/Forms/Checkbox",
  component: Checkbox,
  argTypes: {
    label: { control: "text" },
    value: { control: "boolean" },
    helper: { control: "text" },
  },
};

const Template = ({ ...args }) => ({
  Component: Checkbox,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};

export const Checked = Template.bind({});
Checked.args = {
  label: "Label",
  value: true,
};

export const WithHelper = Template.bind({});
WithHelper.args = {
  label: "Label",
  helper: "Helper",
};
