import NewUpdate from "./NewUpdate.svelte";

export default {
  title: "OmniaWrite/Shared/NewUpdate",
  component: NewUpdate,
  argTypes: {
    show: { control: "boolean" },
  },
};

const Template = ({ ...args }) => ({
  Component: NewUpdate,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
