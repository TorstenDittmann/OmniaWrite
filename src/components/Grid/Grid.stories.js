import { withSlots, intoTarget } from "../../stories/decorators/svelte-slots";
import Grid from "./Grid.svelte";
import GridElement from "./GridElement.svelte";

export default {
  title: "OmniaWrite/Components/Grid/Grid",
  component: Grid,
  argTypes: {
    columns: { control: { type: "number", min: 2, max: 4, step: 2 } },
  },
  decorators: [
    withSlots({
      default: intoTarget(target => {
        for (let i = 1; i <= 9; i++) {
          new GridElement({ target, props: { title: `Element ${i}` } });
        }
      }),
    }),
  ],
};

const Template = ({ ...args }) => ({
  Component: Grid,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  columns: 2,
};

export const FourColumns = Template.bind({});
FourColumns.args = {
  columns: 4,
};
