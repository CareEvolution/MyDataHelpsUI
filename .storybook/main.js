module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "storybook-addon-fetch-mock"],
  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },
  docs: {
    autodocs: true
  },
  webpackFinal: async (config) => {
    //Imports ending with "?raw" are loaded as text
    config.module.rules.push({
      resourceQuery: /raw/,
      type: 'asset/source'
    });

    //Ensure that "?raw" imports are not processed by other loaders
    for(var ruleKey in config.module.rules) {
      let rule = config.module.rules[ruleKey];
      if(rule.resourceQuery && typeof rule.resourceQuery !== 'object') {
        continue;
      }

      if(!rule.resourceQuery) {
        rule.resourceQuery = {};
      }
      if(!rule.resourceQuery.not) {
        rule.resourceQuery.not = [];
      }
      rule.resourceQuery.not.push(/raw/);
    }

    return config;
  },
};