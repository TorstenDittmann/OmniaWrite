import Select from "./Select.svelte";

export default {
  title: "OmniaWrite/Components/Forms/Select",
  component: Select,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    options: { control: "object" },
    helper: { control: "text" },
  },
};

const Template = ({ ...args }) => ({
  Component: Select,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};

export const WithOptions = Template.bind({});
WithOptions.args = {
  label: "Label",
  value: "option2",
  options: [
    { value: "option1", text: "Option 1" },
    { value: "option2", text: "Option 2" },
  ],
};

export const WithHelper = Template.bind({});
WithHelper.args = {
  label: "Label",
  helper: "Helper",
};
