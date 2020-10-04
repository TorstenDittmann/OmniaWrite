import { withSlots, fromText } from "../../stories/decorators/svelte-slots";
import Button from "./Button.svelte";

export default {
  title: "OmniaWrite/Components/Forms/Button",
  component: Button,
  argTypes: {
    color: { control: "text" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    onClick: { action: "onClick" },
  },
  decorators: [
    withSlots({
      default: fromText("Label"),
    }),
  ],
};

const Template = ({ onClick, ...args }) => ({
  Component: Button,
  props: args,
  on: {
    click: onClick,
  },
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
