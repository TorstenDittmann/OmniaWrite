import {
  withSlots,
  getSlotProps,
  fromText,
} from "../../stories/decorators/svelte-slots";
import Cell from "./Cell.svelte";

export default {
  title: "OmniaWrite/Components/Table/Cell",
  component: Cell,
  argTypes: {
    label: { control: "text" },
  },
  decorators: [
    withSlots({
      default: fromText("Content"),
    }),
  ],
  excludeStories: /^make.*/,
};

export const makeCell = (target, label, content) =>
  new Cell({
    target,
    props: {
      label,
      ...getSlotProps({ default: fromText(content) }),
    },
  });

const Template = ({ ...args }) => ({
  Component: Cell,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
