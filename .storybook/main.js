module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
  ],
  webpackFinal: async (config, { configType }) => {
    // Hijack default Svelte presets
    // See https://github.com/storybookjs/storybook/blob/master/app/svelte/src/server/framework-preset-svelte.ts
    const svelteRule = config.module.rules.find(
      rule => rule.test.toString() == "/\\.(svelte|html)$/"
    );
    if (svelteRule) {
      svelteRule.options.emitCss = true;
      svelteRule.options.preprocess = require("svelte-preprocess")({});
    }
    return config;
  },
};
