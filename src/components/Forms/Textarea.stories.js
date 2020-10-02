import Textarea from "./Textarea.svelte";

export default {
  title: "OmniaWrite/Forms/Textarea",
  component: Textarea,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    helper: { control: "text" },
  },
};

const Template = ({ ...args }) => ({
  Component: Textarea,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: "Label",
  value: "This is a text value",
};

export const WithHelper = Template.bind({});
WithHelper.args = {
  label: "Label",
  helper: "Helper",
};
