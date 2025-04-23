import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  env: (config) => ({
    ...config,
    // Dummy API keys for demonstration purposes only
    STORYBOOK_AMAP_KEY: 'amap_dummy_key_1234567890',
    STORYBOOK_GOOGLE_PLACES_KEY: 'google_places_dummy_key_1234567890',
  }),
  core: {
    disableTelemetry: true,
  },
  staticDirs: ["../public"],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      propFilter: () => true,
    },
  },
};

export default config;
