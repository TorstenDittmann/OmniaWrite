import Search from "./Search.svelte";

export default {
  title: "OmniaWrite/Forms/Search",
  component: Search,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    placeholder: { control: "text" },
    autocomplete: { control: { type: "inline-radio", options: ["on", "off"] } },
  },
};

const Template = ({ ...args }) => ({
  Component: Search,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  label: "Label",
  placeholder: "Placeholder",
};
