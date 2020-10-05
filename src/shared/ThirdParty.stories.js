import ThirdParty from "./ThirdParty.svelte";

export default {
  title: "OmniaWrite/Shared/ThirdParty",
  component: ThirdParty,
};

const Template = ({ ...args }) => ({
  Component: ThirdParty,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
