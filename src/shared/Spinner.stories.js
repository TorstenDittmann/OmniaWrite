import Spinner from "./Spinner.svelte";

export default {
  title: "OmniaWrite/Shared/Spinner",
  component: Spinner,
};

const Template = ({ ...args }) => ({
  Component: Spinner,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
