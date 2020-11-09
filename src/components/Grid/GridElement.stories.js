import { withSlots, fromText } from "../../stories/decorators/svelte-slots";
import GridElement from "./GridElement.svelte";

export default {
  title: "OmniaWrite/Components/Grid/GridElement",
  component: GridElement,
  argTypes: {
    action: { control: "boolean" },
    onClick: { action: "onClick" },
  },
  decorators: [
    withSlots({
      default: fromText("Content"),
    }),
  ],
};

const Template = ({ onClick, ...args }) => ({
  Component: GridElement,
  props: args,
  on: {
    click: onClick,
  },
});

export const Default = Template.bind({});
Default.args = {
  title: "Title",
};

export const Action = Template.bind({});
Action.args = {
  title: "Title",
  action: true,
};
