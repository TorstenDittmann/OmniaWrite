import { addDecorator } from "@storybook/svelte";
import Wrapper from "./Wrapper.svelte";
import { getLocaleFromNavigator, addMessages, init } from "svelte-i18n";

import en from "../src/lang/en.json";
import de from "../src/lang/de.json";
import es from "../src/lang/es.json";
import pt from "../src/lang/pt.json";

addMessages("en", en);
addMessages("de", de);
addMessages("es", es);
addMessages("pt", pt);

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});

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
