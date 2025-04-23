import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfigProvider } from 'antd';
import { AddAddressButton } from './AddressCard';

const meta = {
  title: 'Molecules/AddAddressButton',
  component: AddAddressButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A button component for adding new addresses that uses Ant Design's theme tokens for consistent styling:

### Theme Tokens Used
- \`colorPrimary\`: Used for icon and text color
- \`fontSizeSM\`: Small font size (14px) for text
- \`lineHeightSM\`: Line height for text (1.5715)
- \`paddingXS\`: Spacing between icon and text (8px)
- \`motionDurationMid\`: Animation duration (0.2s)
- \`colorPrimaryBorder\`: Focus outline color
- \`controlHeight\`: Used to calculate icon size

### Features
- Accessible focus states
- Smooth hover transitions
- Proper spacing and alignment
- Responsive to theme changes
- Internationalization support

### Usage Guidelines
- Use for adding new items in forms or lists
- Place in a prominent location when adding is a primary action
- Maintain consistent spacing around the button
- Consider using with a loading state for async operations
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: 'The text to display next to the plus icon',
      control: 'text',
    },
    onClick: {
      description: 'Callback function when the button is clicked',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AddAddressButton>;

export default meta;
type Story = StoryObj<typeof AddAddressButton>;

/**
 * Default example with Chinese text
 */
export const Default: Story = {
  args: {
    text: '添加新地址',
  },
};

/**
 * Example with English text
 */
export const English: Story = {
  args: {
    text: 'Add New Address',
  },
};

/**
 * Example with custom theme color
 */
export const CustomTheme: Story = {
  args: {
    text: '添加新地址',
  },
  decorators: [
    (Story) => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1677ff',
          },
        }}
      >
        <Story />
      </ConfigProvider>
    ),
  ],
}; 