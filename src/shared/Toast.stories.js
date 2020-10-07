import { withSlots, fromHTML } from "../stories/decorators/svelte-slots";
import Toast from "./Toast.svelte";

export default {
  title: "OmniaWrite/Shared/Toast",
  component: Toast,
  argTypes: {
    show: { control: "boolean" },
    text: { control: "text" },
    duration: { control: "number" },
  },
  decorators: [
    withSlots({
      default: fromHTML(
        `<h3>Quisque gravida, risus in tristique.</h3>
        <p>
        Vivamus scelerisque, <i>velit vitae tempor tempor</i>, lacus turpis 
        hendrerit ipsum, varius porta risus magna sit amet enim.
        </p>`
      ),
    }),
  ],
};

const Template = ({ ...args }) => ({
  Component: Toast,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};

export const Show = Template.bind({});
Show.args = {
  show: true,
  text: "This is a toast message",
  duration: 2000,
};
