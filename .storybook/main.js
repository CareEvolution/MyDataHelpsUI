module.exports = {
  "stories": ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  "addons": [
    "@storybook/addon-links",
    {
      // backgrounds only recolors the canvas; the theme button drives the real surfaces.
      name: "@storybook/addon-essentials",
      options: { backgrounds: false }
    },
    "@storybook/addon-interactions",
    "@storybook/addon-webpack5-compiler-babel",
    "@chromatic-com/storybook"
  ],

  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },

  staticDirs: ['public'],

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};