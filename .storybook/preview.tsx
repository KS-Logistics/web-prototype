import React from 'react';
import { Preview } from "@storybook/react";
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';

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
        amap: process.env.STORYBOOK_AMAP_KEY || 'amap_dummy_key_1234567890',
        google: process.env.STORYBOOK_GOOGLE_PLACES_KEY || 'google_places_dummy_key_1234567890',
      },
    },
  },
};

export default preview; 