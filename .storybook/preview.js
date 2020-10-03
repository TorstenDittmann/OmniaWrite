import { addDecorator } from "@storybook/svelte";
import Wrapper from "./Wrapper.svelte";

addDecorator(storyFn => {
  const { Component, props, on, WrapperData } = storyFn();

  return {
    Component,
    props,
    on,
    Wrapper,
    WrapperData,
  };
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
