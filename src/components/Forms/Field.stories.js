import Field from "./Field.svelte";

export default {
  title: "OmniaWrite/Forms/Field",
  component: Field,
  argTypes: {
    label: { control: "text" },
    helper: { control: "text" },
  },
};

const Template = ({ ...args }) => ({
  Component: Field,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};

export const WithHelper = Template.bind({});
WithHelper.args = {
  label: "Label",
  helper: "Helper",
};
