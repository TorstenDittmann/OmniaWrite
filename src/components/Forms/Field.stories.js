import { withSlots, fromHTML } from "../../stories/decorators/svelte-slots";
import Field from "./Field.svelte";

export default {
  title: "OmniaWrite/Components/Forms/Field",
  component: Field,
  argTypes: {
    label: { control: "text" },
    helper: { control: "text" },
  },
  decorators: [
    withSlots({
      default: fromHTML("Field <b>slot</b> <i>content</i>"),
    }),
  ],
};

const Template = ({ ...args }) => ({
  Component: Field,
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
