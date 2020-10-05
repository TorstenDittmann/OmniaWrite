import Placeholder from "./Placeholder.svelte";

export default {
  title: "OmniaWrite/Shared/Placeholder",
  component: Placeholder,
};

const Template = ({ ...args }) => ({
  Component: Placeholder,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
