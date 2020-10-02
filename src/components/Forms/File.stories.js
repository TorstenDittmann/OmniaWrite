import File from "./File.svelte";

export default {
  title: "OmniaWrite/Forms/File",
  component: File,
  argTypes: {
    label: { control: "text" },
    helper: { control: "text" },
  },
};

const Template = ({ ...args }) => ({
  Component: File,
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
