import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusDisplay } from './StatusDisplay';

const meta = {
  title: 'Molecules/StatusDisplay',
  component: StatusDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A status display component that shows package processing information with:
- Status icon
- Processing status message
- Tracking number
- Additional information

All text content is configurable through props for internationalization support.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The main title text',
      control: 'text',
    },
    trackingLabel: {
      description: 'The label for the tracking number',
      control: 'text',
    },
    trackingNumber: {
      description: 'The tracking number value',
      control: 'text',
    },
    message: {
      description: 'The message to display at the bottom',
      control: 'text',
    },
  },
} satisfies Meta<typeof StatusDisplay>;

export default meta;
type Story = StoryObj<typeof StatusDisplay>;

/**
 * Default display showing a package in processing status (Chinese)
 */
export const ChineseExample: Story = {
  args: {
    title: '您的包裹已进入打包流程',
    trackingLabel: '国际单号',
    trackingNumber: 'AU4363',
    message: '我们会在截单日期前通知您查看并付款',
  },
};

/**
 * Example with English content
 */
export const EnglishExample: Story = {
  args: {
    title: 'Your package is being processed',
    trackingLabel: 'Tracking Number',
    trackingNumber: 'AU4363',
    message: 'We will notify you to review and make payment before the cutoff date',
  },
};

/**
 * Example with different tracking number format
 */
export const DifferentTracking: Story = {
  args: {
    ...ChineseExample.args,
    trackingNumber: 'CN8888',
  },
}; 