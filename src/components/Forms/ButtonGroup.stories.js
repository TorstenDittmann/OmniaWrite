import {
  withSlots,
  intoTarget,
  getSlotProps,
  fromText,
} from "../../stories/decorators/svelte-slots";
import ButtonGroup from "./ButtonGroup.svelte";
import Button from "./Button.svelte";

export default {
  title: "OmniaWrite/Forms/ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    small: { control: "boolean" },
  },
  decorators: [
    withSlots({
      default: intoTarget(target => {
        const label = string =>
          getSlotProps({
            default: fromText(string),
          });
        new Button({ target, props: { ...label("Button 1"), color: "red" } });
        new Button({ target, props: { ...label("Button 2"), color: "green" } });
        new Button({ target, props: { ...label("Button 3"), loading: true } });
      }),
    }),
  ],
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
