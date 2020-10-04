import { withSlots, intoTarget } from "../../stories/decorators/svelte-slots";
import { makeRow, makeHeadings, makeCells } from "./Row.stories";
import Table from "./Table.svelte";

export default {
  title: "OmniaWrite/Components/Table/Table",
  component: Table,
  argTypes: {},
  decorators: [
    withSlots({
      default: intoTarget(target => {
        makeRow(target, t => makeHeadings(t, 4));
        for (let i = 1; i <= 5; i++) {
          makeRow(target, t => makeCells(t, 4, 4 * (i - 1) + 1));
        }
      }),
    }),
  ],
};

const Template = ({ ...args }) => ({
  Component: Table,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
