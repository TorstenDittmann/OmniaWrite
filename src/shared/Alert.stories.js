import {
  withSlots,
  fromText,
  fromHTML,
} from "../stories/decorators/svelte-slots";
import Alert from "./Alert.svelte";

export default {
  title: "OmniaWrite/Shared/Alert",
  component: Alert,
  argTypes: {
    show: { type: "boolean" },
    danger: { type: "boolean" },
    success: { type: "boolean" },
    info: { type: "boolean" },
    warning: { type: "boolean" },
    duration: { type: "number" },
  },
  decorators: [
    withSlots({
      title: fromText("Praesent a blandit libero"),
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
  Component: Alert,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  show: true,
};

export const Transient = Template.bind({});
Transient.args = {
  show: true,
  duration: 2000,
};

export const Persistent = Template.bind({});
Persistent.args = {
  show: true,
  duration: undefined,
};
