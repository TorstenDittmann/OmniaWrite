import {
  withSlots,
  getSlotProps,
  fromText,
} from "../../stories/decorators/svelte-slots";
import Heading from "./Heading.svelte";

export default {
  title: "OmniaWrite/Components/Table/Heading",
  component: Heading,
  argTypes: {},
  decorators: [
    withSlots({
      default: fromText("Content"),
    }),
  ],
  excludeStories: /^make.*/,
};

export const makeHeading = (target, label) =>
  new Heading({
    target,
    props: {
      ...getSlotProps({ default: fromText(label) }),
    },
  });

const Template = ({ ...args }) => ({
  Component: Heading,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
