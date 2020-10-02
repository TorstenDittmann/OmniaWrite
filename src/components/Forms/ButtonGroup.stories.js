import ButtonGroup from "./ButtonGroup.svelte";

export default {
  title: "OmniaWrite/Forms/ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    small: { control: "boolean" },
  },
};

const Template = ({ ...args }) => ({
  Component: ButtonGroup,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Small.args = {
  small: true,
};
