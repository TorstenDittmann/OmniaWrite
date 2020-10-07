import {
  withSlots,
  getSlotProps,
  intoTarget,
} from "../../stories/decorators/svelte-slots";
import { makeHeading } from "./Heading.stories";
import { makeCell } from "./Cell.stories";
import Row from "./Row.svelte";

export default {
  title: "OmniaWrite/Components/Table/Row",
  component: Row,
  argTypes: {
    onClick: { action: "onClick" },
  },
  excludeStories: /^make.*/,
};

export const makeRow = (target, contentFn) =>
  new Row({
    target,
    props: {
      ...getSlotProps({ default: intoTarget(contentFn) }),
    },
  });
export const makeHeadings = (target, nb) => {
  for (let i = 0; i < nb; i++) {
    makeHeading(target, `Heading ${i + 1}`);
  }
};
export const makeCells = (target, nb, first = 1) => {
  for (let i = 0; i < nb; i++) {
    makeCell(target, `Label ${first + i}`, `Content ${first + i}`);
  }
};

const Template = ({ onClick, ...args }) => ({
  Component: Row,
  props: args,
  on: {
    click: onClick,
  },
});

export const WithHeadings = Template.bind({});
WithHeadings.args = {};
WithHeadings.decorators = [
  withSlots({
    default: intoTarget(target => makeHeadings(target, 3)),
  }),
];

export const WithCells = Template.bind({});
WithCells.args = {};
WithCells.decorators = [
  withSlots({
    default: intoTarget(target => makeCells(target, 3)),
  }),
];
