import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { AddressForm } from './AddressForm';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

const meta = {
  title: 'Molecules/AddressForm',
  component: AddressForm,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'responsive',
    },
    backgrounds: {
      default: 'light',
    },
    docs: {
      description: {
        component: `
A form component for collecting address information with support for address autocompletion using AMap (高德地图) or Google Places.

### API Keys Configuration
For development and testing, the component uses dummy API keys configured in Storybook:
\`\`\`js
// .storybook/main.ts
{
  env: {
    STORYBOOK_AMAP_KEY: 'amap_dummy_key_1234567890',
    STORYBOOK_GOOGLE_PLACES_KEY: 'google_places_dummy_key_1234567890',
  }
}
\`\`\`

For production use, replace these with real API keys:
- AMap Key: Get from [高德开放平台](https://lbs.amap.com/)
- Google Places Key: Get from [Google Cloud Console](https://console.cloud.google.com/)
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    apiKeys: {
      control: 'object',
      description: 'API keys for map services (AMap and Google Places)',
      table: {
        defaultValue: {
          summary: JSON.stringify({
            amap: 'amap_dummy_key_1234567890',
            google: 'google_places_dummy_key_1234567890',
          }, null, 2),
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Decorator to provide language context
const withLocale = (Story, { args }) => (
  <ConfigProvider locale={args.lang === 'zh' ? zhCN : enUS}>
    <div style={{ width: '100%', maxWidth: '600px', padding: '24px' }}>
      <Story />
    </div>
  </ConfigProvider>
);

// Base story configuration
const baseArgs = {
  onSubmit: (values) => console.log('Submit:', values),
  onCancel: () => console.log('Cancel'),
  apiKeys: {
    amap: process.env.STORYBOOK_AMAP_KEY || 'amap_dummy_key_1234567890',
    google: process.env.STORYBOOK_GOOGLE_PLACES_KEY || 'google_places_dummy_key_1234567890',
  },
};

export const ChineseEmpty = {
  args: {
    ...baseArgs,
    lang: 'zh',
  },
  decorators: [withLocale],
  parameters: {
    docs: {
      description: {
        story: '空白表单，使用高德地图自动完成地址。使用配置的高德地图API密钥。',
      },
    },
  },
};

export const EnglishEmpty = {
  args: {
    ...baseArgs,
    lang: 'en',
  },
  decorators: [withLocale],
  parameters: {
    docs: {
      description: {
        story: 'Empty form with Google Places autocomplete. Uses configured Google Places API key.',
      },
    },
  },
};

export const ChineseWithData = {
  args: {
    ...baseArgs,
    lang: 'zh',
    initialValues: {
      name: '李华',
      phone: '0411234567',
      organization: '示例公司',
      addressLine1: '3楼301室',
      addressLine2: '100号皮特街',
      locality: '悉尼',
      administrativeArea: '新南威尔士州',
      postalCode: '2000',
      countryName: 'Australia',
      countryNameLocalized: '澳大利亚',
      countryCode: 'AU',
    },
  },
  decorators: [withLocale],
  parameters: {
    docs: {
      description: {
        story: '预填充数据的表单，展示了如何显示和编辑现有地址。支持地址自动完成功能。',
      },
    },
  },
};

export const EnglishWithData = {
  args: {
    ...baseArgs,
    lang: 'en',
    initialValues: {
      name: 'John Smith',
      phone: '0411234567',
      organization: 'Example Corp',
      addressLine1: 'Level 3, Suite 301',
      addressLine2: '100 Pitt Street',
      locality: 'Sydney',
      administrativeArea: 'NSW',
      postalCode: '2000',
      countryName: 'Australia',
      countryNameLocalized: 'Australia',
      countryCode: 'AU',
    },
  },
  decorators: [withLocale],
  parameters: {
    docs: {
      description: {
        story: 'Form with pre-filled data, demonstrating how to display and edit an existing address. Supports address autocompletion.',
      },
    },
  },
};

export const ChineseInternationalAddress = {
  args: {
    ...baseArgs,
    lang: 'zh',
    initialValues: {
      name: '张伟',
      phone: '13812345678',
      organization: '北京科技有限公司',
      addressLine1: '25层2501室',
      addressLine2: '长安街100号',
      addressLine3: '王府井商务中心',
      locality: '北京市',
      administrativeArea: '北京市',
      postalCode: '100006',
      countryName: 'China',
      countryNameLocalized: '中国',
      countryCode: 'CN',
    },
  },
  decorators: [withLocale],
  parameters: {
    docs: {
      description: {
        story: '展示了如何处理国际地址，包括多语言支持和本地化。支持高德地图和Google Places地址自动完成。',
      },
    },
  },
};

export const EnglishInternationalAddress = {
  args: {
    ...baseArgs,
    lang: 'en',
    initialValues: {
      name: 'Zhang Wei',
      phone: '13812345678',
      organization: 'Beijing Tech Co., Ltd.',
      addressLine1: 'Floor 25, Suite 2501',
      addressLine2: '100 Chang\'an Street',
      addressLine3: 'Wangfujing Business Center',
      locality: 'Beijing',
      administrativeArea: 'Beijing',
      postalCode: '100006',
      countryName: 'China',
      countryNameLocalized: '中国',
      countryCode: 'CN',
    },
  },
  decorators: [withLocale],
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates handling of international addresses with multi-language support and localization. Supports both AMap and Google Places autocomplete.',
      },
    },
  },
};

export const WithSubmitting = {
  args: {
    ...ChineseWithData.args,
    isSubmitting: true,
  },
  decorators: [withLocale],
  parameters: {
    docs: {
      description: {
        story: '展示表单提交状态，按钮显示加载动画。地址自动完成功能在提交过程中保持可用。',
      },
    },
  },
}; 