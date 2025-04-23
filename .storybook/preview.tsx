import type { Preview } from "@storybook/react";
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#000000',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
        }}
        locale={zhCN}
      >
        <div style={{ margin: '24px' }}>
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  globalTypes: {
    apiKeys: {
      defaultValue: {
        amap: process.env.STORYBOOK_AMAP_KEY,
        google: process.env.STORYBOOK_GOOGLE_PLACES_KEY,
      },
    },
  },
};

export default preview; 