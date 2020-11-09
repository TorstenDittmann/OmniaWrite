import Disclaimer from "./Disclaimer.svelte";

export default {
  title: "OmniaWrite/Shared/Disclaimer",
  component: Disclaimer,
};

const Template = ({ ...args }) => ({
  Component: Disclaimer,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
