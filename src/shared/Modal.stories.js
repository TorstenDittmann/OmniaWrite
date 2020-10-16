import { withSlots, fromHTML } from "../stories/decorators/svelte-slots";
import Modal from "./Modal.svelte";

export default {
  title: "OmniaWrite/Shared/Modal",
  component: Modal,
  argTypes: {
    show: { type: "boolean" },
    fullscreen: { type: "boolean" },
    persistent: { type: "boolean" },
  },
  decorators: [
    withSlots({
      header: fromHTML("<h2>Praesent a blandit libero</h2>"),
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
  Component: Modal,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  show: true,
};

export const Fullscreen = Template.bind({});
Fullscreen.args = {
  fullscreen: true,
};

export const Persistent = Template.bind({});
Persistent.args = {
  show: true,
  persistent: true,
};
