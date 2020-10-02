import Button from "./Button.svelte";

export default {
  title: "OmniaWrite/Forms/Button",
  component: Button,
  argTypes: {
    color: { control: "text" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

const Template = ({ ...args }) => ({
  Component: Button,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Red = Template.bind({});
Red.args = {
  color: "red",
};

export const Green = Template.bind({});
Green.args = {
  color: "green",
};

export const Outline = Template.bind({});
Outline.args = {
  color: "outline",
};
