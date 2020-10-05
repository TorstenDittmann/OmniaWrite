import Range from "./Range.svelte";

export default {
  title: "OmniaWrite/Components/Forms/Range",
  component: Range,
  argTypes: {
    label: { control: "text" },
    helper: { control: "text" },
    value: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
};

const Template = ({ ...args }) => ({
  Component: Range,
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
